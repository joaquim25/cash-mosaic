import React, { useState, useEffect } from 'react';

import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { ButtonsContainer, CancelButton, ConfimationModalText, ConfirmButton, StyledPopover } from './styles/ConfirmationModalStyles';
import { DefaultButton } from '@/styles/GlobalStyles';

interface ConfirmationModalProps {
    open: boolean;
    anchorEl: HTMLButtonElement | null;
    onClose: () => void;
    action: () => void;
}

function ConfimationModal({ open, anchorEl, onClose, action }: ConfirmationModalProps) {
    const [localOpen, setLocalOpen] = useState(open);

    useEffect(() => {
        setLocalOpen(open);
    }, [open]);

    const handleClose = () => {
        setLocalOpen(false);
        onClose();
    };

    const handleConfirm = () => {
        action();
        handleClose();
    };

    const id = localOpen ? 'simple-popover' : undefined;

    return (
        <StyledPopover
            id={id}
            open={localOpen}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
            }}
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            disableScrollLock={true}
        >
            <ConfimationModalText>Are you sure you want to log out?</ConfimationModalText>
            <ButtonsContainer>
                <ConfirmButton onClick={handleConfirm}>YES</ConfirmButton>
                <CancelButton onClick={handleClose}>NO</CancelButton>
            </ButtonsContainer>
        </StyledPopover>
    );
}

export default ConfimationModal;