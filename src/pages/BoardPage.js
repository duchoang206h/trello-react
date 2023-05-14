import React, { useEffect, useState } from 'react';
import Board from 'react-trello';
import { BoardSkeleton } from '../components/BoardSkeleton';
import { createCard, createList, getBoardById } from '../api/board';
import { useLocation } from 'react-router-dom';

export const BoardPage = (props) => {
    const [board, setBoard] = useState({
        lists: [],
    });
    const location = useLocation();
    //const boardId = () => props.match?.params?.board;
    console.log(location.pathname);
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
        const board = await getBoardById(fetchBoard);
        setBoard(prepareBoard(board));
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
        console.log(data);
    };
    const handleAddCard = async (card, listId) => {
        await createCard({
            title: card.title,
            description: card.description,
            listId: listId,
            order: 1,
        });
    };
    const handleAddList = async ({ title }) => {
        await createList(title, boardId);
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
            onLaneAdd={handleAddList}
        />
    );
};
