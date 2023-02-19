import { React } from 'react';
import { Modal } from 'antd';

const CustomModal = (props) => {
    const { open, hideModal, performAction, title } = props;
    return (
        <Modal
            title="Cảnh báo"
            open={open}
            onOk={performAction}
            onCancel={hideModal}
            okText="OK"
            cancelText="Cancel"
        >
            <p>{title}</p>
        </Modal>
    )
}

export default CustomModal;