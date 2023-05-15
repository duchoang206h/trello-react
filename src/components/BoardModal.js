import { Button, Input, Modal } from 'antd';
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { isEmptyText } from '../utils/common';

export const BoardModal = (props) => {
    const { closeModal, action, visible } = props;
    const [boardTitle, setBoardTitle] = useState('');
    const [loading, setLoading] = useState(false);

    const handleCreateBoard = async (event) => {
        setLoading(true);
        event.preventDefault();
        if (isEmptyText(boardTitle)) {
            return;
        }
        await action({
            title: boardTitle,
        });
        setBoardTitle('');
        setLoading(false);
    };

    return (
        <Modal
            title={boardTitle || 'Add board'}
            width="400px"
            visible={visible}
            onCancel={closeModal}
            footer={null}
        >
            <form className={`w-full`} onSubmit={(event) => handleCreateBoard(event)}>
                <Input
                    className={`mb-3`}
                    placeholder="Title"
                    onChange={(event) => setBoardTitle(event.target.value)}
                    value={boardTitle}
                />
                <Button
                    type="primary"
                    onClick={(event) => handleCreateBoard(event)}
                    loading={loading}
                    disabled={isEmptyText(boardTitle)}
                >
                    Add
                </Button>
            </form>
        </Modal>
    );
};

BoardModal.propTypes = {
    closeModal: PropTypes.func.isRequired,
    action: PropTypes.func.isRequired,
    visible: PropTypes.bool.isRequired,
};

export const BoardModalForUpdate = (props) => {
    const { board, closeModal, action, visible } = props;
    const [boardTitle, setBoardTitle] = useState(board.name);
    const [loading, setLoading] = useState(false);

    const handleUpdateBoard = async (event) => {
        setLoading(true);
        event.preventDefault();
        if (isEmptyText(boardTitle)) {
            return;
        }
        await action({
            id: board.id,
            title: boardTitle,
        });
        setBoardTitle('');
        setLoading(false);
    };

    return (
        <Modal
            title={'Update board'}
            width="400px"
            visible={visible}
            onCancel={closeModal}
            footer={null}
        >
            <form className={`w-full`} onSubmit={(event) => handleUpdateBoard(event)}>
                <Input
                    className={`mb-3`}
                    placeholder="Title"
                    onChange={(event) => setBoardTitle(event.target.value)}
                    value={boardTitle}
                />
                <Button
                    type="primary"
                    onClick={(event) => handleUpdateBoard(event)}
                    loading={loading}
                    disabled={isEmptyText(boardTitle)}
                >
                    Update
                </Button>
            </form>
        </Modal>
    );
};

BoardModalForUpdate.propTypes = {
    board: PropTypes.object.isRequired,
    closeModal: PropTypes.func.isRequired,
    action: PropTypes.func.isRequired,
    visible: PropTypes.bool.isRequired,
};

export const BoardModalForDelete = (props) => {
    const { board, closeModal, action, visible } = props;
    const [boardTitle, setBoardTitle] = useState(board.name);
    const [loading, setLoading] = useState(false);

    const handleDeleteBoard = async (event) => {
        setLoading(true);
        event.preventDefault();
        if (isEmptyText(boardTitle)) {
            return;
        }
        await action({
            id: board.id,
        });
        setBoardTitle('');
        setLoading(false);
    };

    return (
        <Modal
            title={'Delete board'}
            width="400px"
            visible={visible}
            onCancel={closeModal}
            footer={null}
        >
            <form className={`w-full`} onSubmit={(event) => handleDeleteBoard(event)}>
                <Input
                    className={`mb-3`}
                    placeholder="Title"
                    onChange={(event) => setBoardTitle(event.target.value)}
                    value={boardTitle}
                    readOnly
                />
                <div className="flex space-x-5">
                    <Button
                        type="danger"
                        onClick={(event) => {
                            handleDeleteBoard(event);
                            closeModal();
                        }}
                        loading={loading}
                        disabled={isEmptyText(boardTitle)}
                    >
                        Delete
                    </Button>
                    <Button
                        type="primary"
                        onClick={closeModal}
                        loading={loading}
                        disabled={isEmptyText(boardTitle)}
                    >
                        Cancel
                    </Button>
                </div>
            </form>
        </Modal>
    );
};

BoardModalForDelete.propTypes = {
    board: PropTypes.object.isRequired,
    closeModal: PropTypes.func.isRequired,
    action: PropTypes.func.isRequired,
    visible: PropTypes.bool.isRequired,
};
