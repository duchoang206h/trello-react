import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { UserOutlined } from '@ant-design/icons';
import { BoardTitle } from '../components/BoardTitle';
import { BoardModal, BoardModalForDelete, BoardModalForUpdate } from '../components/BoardModal';
import { BoardsPageSkeleton } from '../components/BoardsPageSkeleton';
import { useDispatch, useSelector } from 'react-redux';
import { createBoard, deleteBoard, getBoards, updateBoard } from '../stores/board.slice';
import { isLogged } from '../utils/common';
import { deleteBoardByUser, editBoardByUser } from '../api/board';

export const BoardsPage = () => {
    const { boards, isLoading } = useSelector((state) => state.board);

    const history = useHistory();
    if (!isLogged()) history.push('/signin');
    const [addModalVisible, setAddModalVisible] = useState(false);
    const [updateModalVisible, setUpdateModalVisible] = useState(false);
    const [deleteModalVisible, setDeleteModalVisible] = useState(false);
    const [currentBoard, setCurrentBoard] = useState();

    const dispatch = useDispatch();
    useEffect(() => {
        console.log(boards);
        if (!boards.length) {
            dispatch(getBoards());
        }
    }, [addModalVisible, updateModalVisible, deleteModalVisible]);

    const addBoard = async (board) => {
        //call api add board
        dispatch(createBoard(board.title));
        setAddModalVisible(false);
    };

    const putBoard = async (board) => {
        dispatch(updateBoard([board.id, board.title]));
        setUpdateModalVisible(false);
    };

    const removeBoard = async (board) => {
        console.log(board);
        dispatch(deleteBoard(board.id));
        setUpdateModalVisible(false);
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
                        handleEditBoardClick={() => {
                            setCurrentBoard(board);
                            setUpdateModalVisible(true);
                        }}
                        handleDeleteBoardClick={() => {
                            setCurrentBoard(board);
                            setDeleteModalVisible(true);
                        }}
                        starred={false}
                    />
                ))}
                <BoardTitle
                    title="Add new board"
                    addition={true}
                    handleBoardClick={() => setAddModalVisible(true)}
                />
            </div>

            <BoardModal
                action={addBoard}
                closeModal={() => setAddModalVisible(false)}
                visible={addModalVisible}
            />
            {currentBoard && (
                <BoardModalForUpdate
                    key={currentBoard.id}
                    board={currentBoard}
                    action={putBoard}
                    closeModal={() => setUpdateModalVisible(false)}
                    visible={updateModalVisible}
                />
            )}
            {currentBoard && (
                <BoardModalForDelete
                    key={currentBoard.id + currentBoard.name}
                    board={currentBoard}
                    action={removeBoard}
                    closeModal={() => setDeleteModalVisible(false)}
                    visible={deleteModalVisible}
                />
            )}
        </div>
    );
};
