import { useCallback } from 'react';
import { Modal, Button, Spinner } from 'react-bootstrap';
import { useContacts } from '../context/ContactContext';

function DeleteConfirmModal({ show, onHide, contact }) {
    const { deleteContact, loading } = useContacts();

    const handleDelete = useCallback(async () => {
        try {
            await deleteContact(contact.id);
            onHide();
        } catch (error) {
            console.error('Failed to delete contact:', error);
        }
    }, [contact, deleteContact, onHide]);

    if (!contact) return null;

    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Header closeButton className="bg-danger text-white">
                <Modal.Title>
                    <i className="fa fa-exclamation-triangle me-2"></i>
                    Confirm Delete
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className="text-center py-4">
                <i className="fa fa-trash fa-3x text-danger mb-3"></i>
                <h5>Are you sure you want to delete this contact?</h5>
                <p className="text-muted mb-0">
                    <strong>{contact.firstName} {contact.lastName}</strong>
                </p>
                <p className="text-muted small">
                    This action cannot be undone.
                </p>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-secondary" onClick={onHide}>
                    Cancel
                </Button>
                <Button variant="danger" onClick={handleDelete} disabled={loading}>
                    {loading ? (
                        <>
                            <Spinner animation="border" size="sm" className="me-1" />
                            Deleting...
                        </>
                    ) : (
                        <>
                            <i className="fa fa-trash me-1"></i>
                            Delete Contact
                        </>
                    )}
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default DeleteConfirmModal;
