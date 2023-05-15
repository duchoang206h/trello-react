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
import { number } from 'prop-types';

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

    const handleDataChange = async (data) => {
        console.log(data.lanes);
        console.log(preLists);
        setPreLists(data.lanes);
    };
    const handleAddCard = async (card, listId) => {
        const res = await createCard({
            title: card.title.length ? card.title : '?',
            description: card.description ? card.description.length : '?',
            listId: listId,
            order: 1,
        });
        card.id = res.id;
        console.log(card);
        setCorrespondingId({ ...correspondingId, [card.id]: res.id });
    };
    const handleAddList = async (list) => {
        const res = await createList(list.title, boardId);
        list.id = res.id;
        console.log(list);
        setCorrespondingId({ ...correspondingId, [list.id]: res.id });
    };

    const handleDeleteList = async (listId) => {
        if (typeof id != number) {
            listId = correspondingId[listId];
        }
        deleteList(listId);
    };

    const handleDeleteCard = async (cardId) => {
        if (typeof id != number) {
            cardId = correspondingId[cardId];
        }
        deleteCard(cardId);
    };
    const handleUpdateCard = async (listId, { description, id }) => {
        console.log(listId, description, id);
        if (typeof id != number) {
            id = correspondingId[id];
        }
        editCard({ listId, description, id });
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
