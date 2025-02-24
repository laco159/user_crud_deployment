import React, { useEffect, useState, useCallback } from 'react';
import { Table, Button, Modal, Input, Icon, Pagination, Popup } from 'semantic-ui-react';
import axios from 'axios';
import UserForm from './UserForm';

const UserTable = () => {
    const [users, setUsers] = useState([]);
    const [formOpen, setFormOpen] = useState(false);
    const [confirmOpen, setConfirmOpen] = useState(false);
    const [userIdToDelete, setUserIdToDelete] = useState(null);
    const [userToEdit, setUserToEdit] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [totalPages, setTotalPages] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const fetchUsers = useCallback(async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/users/`, {
                params: {
                    search: searchTerm,
                    page: currentPage,
                },
            });
            setUsers(response.data.results);
            const totalCount = response.data.count || 0;
            const calculatedTotalPages = Math.ceil(totalCount / itemsPerPage);
            setTotalPages(calculatedTotalPages > 0 ? calculatedTotalPages : 1);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    }, [currentPage, searchTerm]);

    useEffect(() => {
        fetchUsers();
    }, [fetchUsers]);

    const handleOpenForm = (user = null) => {
        setUserToEdit(user);
        setFormOpen(true);
    };

    const handleCloseForm = () => {
        setFormOpen(false);
        setUserToEdit(null);
        fetchUsers();
    };

    const handleOpenConfirm = (userId) => {
        setUserIdToDelete(userId);
        setConfirmOpen(true);
    };

    const handleCloseConfirm = () => {
        setConfirmOpen(false);
        setUserIdToDelete(null);
    };

    const handleDeleteUser = async () => {
        if (userIdToDelete) {
            try {
                await axios.delete(`${process.env.REACT_APP_API_URL}/users/${userIdToDelete}/`);
                fetchUsers();
            } catch (error) {
                console.error('Error deleting user:', error);
            }
        }
        handleCloseConfirm();
    };

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
        setCurrentPage(1);
    };

    const handlePageChange = (e, { activePage }) => {
        setCurrentPage(activePage);
    };

    return (
        <>
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '1rem'
                }}
            >
                <Input
                    icon="search"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                />
                <Button
                    icon
                    labelPosition="left"
                    onClick={() => handleOpenForm()}
                    primary
                >
                    <Icon name="plus" />
                    Add User
                </Button>
            </div>

            <UserForm
                open={formOpen}
                onClose={handleCloseForm}
                user={userToEdit}
            />

            <Table celled>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Name</Table.HeaderCell>
                        <Table.HeaderCell>Email</Table.HeaderCell>
                        <Table.HeaderCell>Phone Number</Table.HeaderCell>
                        <Table.HeaderCell textAlign="center">Actions</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    {users.length > 0 ? (
                        users.map((user) => (
                            <Table.Row key={user.id}>
                                <Table.Cell>{user.name}</Table.Cell>
                                <Table.Cell>{user.email}</Table.Cell>
                                <Table.Cell>{user.phone_number}</Table.Cell>
                                <Table.Cell collapsing>
                                    <Popup
                                        content="Edit"
                                        trigger={(
                                            <Button
                                                primary
                                                icon="edit"
                                                onClick={() => handleOpenForm(user)}
                                            />
                                        )}
                                    />
                                    <Popup
                                        content="Delete"
                                        trigger={(
                                            <Button
                                                negative
                                                icon="trash"
                                                onClick={() => handleOpenConfirm(user.id)}
                                            />
                                        )}
                                    />
                                </Table.Cell>
                            </Table.Row>
                        ))
                    ) : (
                        <Table.Row>
                            <Table.Cell
                                colSpan="4"
                                style={{ textAlign: "center" }}
                            >
                                No users available.
                            </Table.Cell>
                        </Table.Row>
                    )}
                </Table.Body>
            </Table>

            {/* Pagination */}
            <Pagination
                activePage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
                boundaryRange={0}
                siblingRange={1}
                ellipsisItem={null}
            />

            {/* Confirmation Modal */}
            <Modal
                open={confirmOpen}
                onClose={handleCloseConfirm}
                size="small"
            >
                <Modal.Header>Confirm Deletion</Modal.Header>
                <Modal.Content>
                    Are you sure you want to delete this user?
                </Modal.Content>
                <Modal.Actions>
                    <Button
                        onClick={handleCloseConfirm}
                        negative
                    >
                        No
                    </Button>
                    <Button
                        onClick={handleDeleteUser}
                        positive
                    >
                        Yes
                    </Button>
                </Modal.Actions>
            </Modal>
        </>
    );
};

export default UserTable;
