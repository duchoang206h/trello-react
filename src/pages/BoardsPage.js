import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { UserOutlined, StarOutlined } from '@ant-design/icons';
import { BoardTitle } from '../components/BoardTitle';
import { BoardModal } from '../components/BoardModal';
import { BoardsPageSkeleton } from '../components/BoardsPageSkeleton';
import { useDispatch, useSelector } from 'react-redux';
import { createBoard, getBoards } from '../stores/board.slice';
import { isLogged } from '../utils/common';

export const BoardsPage = () => {
    const { boards, isLoading } = useSelector((state) => state.board);

    const history = useHistory();
    if (!isLogged()) history.push('/signin');
    const [modalVisible, setModalVisible] = useState(false);
    const dispatch = useDispatch();
    useEffect(() => {
        if (!boards.length) {
            dispatch(getBoards());
        }
    }, []);

    const addBoard = async (board) => {
        //call api add board
        dispatch(createBoard(board.title));
        setModalVisible(false);
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
                        key={board?.id}
                        title={board.name}
                        handleBoardClick={() => history.push(`boards/${board?.id}`)}
                        starred={false}
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
