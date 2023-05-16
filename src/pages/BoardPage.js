import React, { useEffect, useState } from 'react';
import Board from 'react-trello';
import { BoardSkeleton } from '../components/BoardSkeleton';
import {
    createCard,
    createList,
    deleteCard,
    deleteList,
    editCard,
    getBoardById,
} from '../api/board';
import { useLocation } from 'react-router-dom';
import { isEmptyText } from '../utils/common';

export const BoardPage = (props) => {
    const [board, setBoard] = useState({
        lists: [],
    });
    const [correspondingId, setCorrespondingId] = useState({});
    const [preLists, setPreLists] = useState([]);
    const location = useLocation();
    //const boardId = () => props.match?.params?.board;
    const boardId = parseInt(location.pathname.replace('/boards/', ''));
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        (async () => {
            setLoading(true);
            await fetchBoard(boardId);
            setLoading(false);
        })();
    }, []);

    const fetchBoard = async (fetchBoard) => {
        // call getBoardById
        const boardData = await getBoardById(fetchBoard);
        setBoard(prepareBoard(boardData));
        setPreLists(board.lists);
    };

    // Fill empty properties that are important for Board component
    const prepareBoard = (board) => ({
        ...board,
        lists: (board?.lists || []).map((list) => ({
            ...list,
            cards: list?.cards || [],
        })),
    });

    const convertId = (id) => {
        if (typeof id != 'number') {
            id = correspondingId[id];
        }
        return id;
    };

    const handleDataChange = async (data) => {
        if (data.lanes.length !== preLists.length) {
            setPreLists(data.lanes);
            return;
        }
        let check = 0;
        for (const lane of data.lanes) {
            check += lane?.cards?.length;
        }
        for (const list of preLists) {
            check -= list?.cards?.length;
        }
        if (check !== 0) {
            setPreLists(data.lanes);
            return;
        }
        for (const i in preLists) {
            const preCards = preLists[i].cards;
            const curCards = data.lanes[i].cards;
            const listId = preLists[i].id;
            console.log(preCards, curCards);
            if (preCards.length < curCards.length) {
                for (const j in curCards) {
                    const isCard = preCards.find((card) => card.id === curCards[j].id);
                    if (!isCard) {
                        console.log(curCards[j], listId);
                        await handleUpdateCard(listId, curCards[j]);
                        console.log('Update successful');
                        setPreLists(data.lanes);
                        return;
                    }
                }
            }
        }
        setPreLists(data.lanes);
    };
    const handleAddCard = async (card, listId) => {
        listId = convertId(listId);
        const res = await createCard({
            title: isEmptyText(card.title) ? '?' : card.title,
            description: isEmptyText(card.description) ? '?' : card.description,
            listId,
            order: 1,
        });
        setCorrespondingId({ ...correspondingId, [card.id]: res.id });
    };
    const handleAddList = async (list) => {
        const res = await createList(isEmptyText(list.title) ? '?' : list.title, boardId);
        setCorrespondingId({ ...correspondingId, [list.id]: res.id });
    };

    const handleDeleteList = async (listId) => {
        listId = convertId(listId);
        deleteList(listId);
    };

    const handleDeleteCard = async (cardId) => {
        cardId = convertId(cardId);
        deleteCard(cardId);
    };
    const handleUpdateCard = async (listId, card) => {
        card.id = convertId(card.id);
        listId = convertId(listId);
        editCard(card, listId);
    };

    if (loading) {
        return <BoardSkeleton count={5} />;
    }

    return (
        <Board
            className={`pt-16 bg-blue-500 h-full`}
            canAddLanes={true}
            editable={true}
            data={{
                lanes: board.lists || [],
            }}
            onDataChange={handleDataChange}
            onCardAdd={handleAddCard}
            onCardDelete={handleDeleteCard}
            onCardUpdate={handleUpdateCard}
            onLaneAdd={handleAddList}
            onLaneDelete={handleDeleteList}
        />
    );
};
