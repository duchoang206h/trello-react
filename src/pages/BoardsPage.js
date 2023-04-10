import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { UserOutlined, StarOutlined } from '@ant-design/icons';
import { BoardTitle } from '../components/BoardTitle';
import { BoardModal } from '../components/BoardModal';
import { BoardsPageSkeleton } from '../components/BoardsPageSkeleton';
import { useDispatch, useSelector } from 'react-redux';
import { getBoards } from '../stores/board.slice';
import { isLogged } from '../utils/common';

export const BoardsPage = () => {
    const { boards, isLoading } = useSelector((state) => state.board);
    const { userId } = useSelector((state) => state.auth);

    const history = useHistory();
    if (!isLogged()) history.push('/signin');
    const [modalVisible, setModalVisible] = useState(false);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getBoards(userId));
    }, []);

    const addBoard = async (board) => {
        //call api add board
        setModalVisible(false);
    };

    const starBoard = async (board, starred) => {
        //call api add board
    };

    if (isLoading) {
        return <BoardsPageSkeleton count={4} />;
    }

    return (
        <div className={`pt-16 py-4 px-3`}>
            <div className="flex mb-3 items-center text-xl">
                <UserOutlined className={`mr-2`} /> Personal Boards
            </div>

            <div className="grid grid-cols-4 gap-4">
                {boards.map((board) => (
                    <BoardTitle
                        key={board?.key}
                        title={board.title}
                        handleBoardClick={() => history.push(`boards/${board?.key}`)}
                        handleBoardStarToggling={() => starBoard(board?.key, !board.starred)}
                        starred={board.starred || false}
                    />
                ))}
                <BoardTitle
                    title="Add new board"
                    addition={true}
                    handleBoardClick={() => setModalVisible(true)}
                />
            </div>

            <BoardModal
                action={addBoard}
                closeModal={() => setModalVisible(false)}
                visible={modalVisible}
            />
        </div>
    );
};
