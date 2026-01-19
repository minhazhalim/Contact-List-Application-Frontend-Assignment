import { useState, useCallback } from 'react';
import { Table, Button, Spinner, Alert } from 'react-bootstrap';
import { useContacts } from '../context/ContactContext';
import ShowContactModal from './ShowContactModal';
import EditContactModal from './EditContactModal';
import DeleteConfirmModal from './DeleteConfirmModal';

function ContactTable() {
    const { filteredContacts, loading, error } = useContacts();

    // Modal states
    const [showViewModal, setShowViewModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedContact, setSelectedContact] = useState(null);

    // View contact handler
    const handleView = useCallback((contact) => {
        setSelectedContact(contact);
        setShowViewModal(true);
    }, []);

    // Edit contact handler
    const handleEdit = useCallback((contact) => {
        setSelectedContact(contact);
        setShowEditModal(true);
    }, []);

    // Delete contact handler
    const handleDelete = useCallback((contact) => {
        setSelectedContact(contact);
        setShowDeleteModal(true);
    }, []);

    // Close modals
    const handleCloseViewModal = useCallback(() => {
        setShowViewModal(false);
        setSelectedContact(null);
    }, []);

    const handleCloseEditModal = useCallback(() => {
        setShowEditModal(false);
        setSelectedContact(null);
    }, []);

    const handleCloseDeleteModal = useCallback(() => {
        setShowDeleteModal(false);
        setSelectedContact(null);
    }, []);

    // Open edit from view modal
    const handleEditFromView = useCallback(() => {
        setShowViewModal(false);
        setShowEditModal(true);
    }, []);

    if (loading) {
        return (
            <div className="text-center py-5">
                <Spinner animation="border" variant="primary" />
                <p className="mt-2">Loading contacts...</p>
            </div>
        );
    }

    if (error) {
        return (
            <Alert variant="danger" className="m-3">
                <i className="fa fa-exclamation-triangle me-2"></i>
                {error}
            </Alert>
        );
    }

    if (filteredContacts.length === 0) {
        return (
            <div className="text-center py-5">
                <i className="fa fa-address-book fa-3x text-muted mb-3"></i>
                <h4 className="text-muted">No Contact Information</h4>
                <p className="text-muted">
                    No contacts found. Add a new contact to get started!
                </p>
            </div>
        );
    }

    return (
        <>
            <Table striped hover responsive>
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">First Name</th>
                        <th scope="col">Last Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Phone</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredContacts.map((contact, index) => (
                        <tr key={contact.id}>
                            <td>{index + 1}</td>
                            <td>{contact.firstName}</td>
                            <td>{contact.lastName}</td>
                            <td>{contact.email}</td>
                            <td>{contact.phone}</td>
                            <td width="150">
                                <Button
                                    variant="outline-info"
                                    size="sm"
                                    className="btn-circle me-1"
                                    title="Show"
                                    onClick={() => handleView(contact)}
                                >
                                    <i className="fa fa-eye"></i>
                                </Button>
                                <Button
                                    variant="outline-secondary"
                                    size="sm"
                                    className="btn-circle me-1"
                                    title="Edit"
                                    onClick={() => handleEdit(contact)}
                                >
                                    <i className="fa fa-edit"></i>
                                </Button>
                                <Button
                                    variant="outline-danger"
                                    size="sm"
                                    className="btn-circle"
                                    title="Delete"
                                    onClick={() => handleDelete(contact)}
                                >
                                    <i className="fa fa-times"></i>
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            {/* View Contact Modal */}
            <ShowContactModal
                show={showViewModal}
                onHide={handleCloseViewModal}
                contact={selectedContact}
                onEdit={handleEditFromView}
            />

            {/* Edit Contact Modal */}
            <EditContactModal
                show={showEditModal}
                onHide={handleCloseEditModal}
                contact={selectedContact}
            />

            {/* Delete Confirmation Modal */}
            <DeleteConfirmModal
                show={showDeleteModal}
                onHide={handleCloseDeleteModal}
                contact={selectedContact}
            />
        </>
    );
}

export default ContactTable;
