import { createContext, useContext, useReducer, useCallback, useMemo, useEffect } from 'react';

// API Base URL - Uses environment variable for production, falls back to localhost for development
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';
const API_URL = `${API_BASE_URL}/contacts`;

// Action Types
const ACTIONS = {
  SET_CONTACTS: 'SET_CONTACTS',
  ADD_CONTACT: 'ADD_CONTACT',
  UPDATE_CONTACT: 'UPDATE_CONTACT',
  DELETE_CONTACT: 'DELETE_CONTACT',
  SET_LOADING: 'SET_LOADING',
  SET_ERROR: 'SET_ERROR',
  SET_SEARCH_TERM: 'SET_SEARCH_TERM',
  SET_FILTER: 'SET_FILTER',
};

// Initial State
const initialState = {
  contacts: [],
  loading: false,
  error: null,
  searchTerm: '',
  filter: 'default',
};

// Reducer Function
function contactReducer(state, action) {
  switch (action.type) {
    case ACTIONS.SET_CONTACTS:
      return { ...state, contacts: action.payload, loading: false, error: null };
    case ACTIONS.ADD_CONTACT:
      return { ...state, contacts: [...state.contacts, action.payload], loading: false };
    case ACTIONS.UPDATE_CONTACT:
      return {
        ...state,
        contacts: state.contacts.map((contact) =>
          contact.id === action.payload.id ? action.payload : contact
        ),
        loading: false,
      };
    case ACTIONS.DELETE_CONTACT:
      return {
        ...state,
        contacts: state.contacts.filter((contact) => contact.id !== action.payload),
        loading: false,
      };
    case ACTIONS.SET_LOADING:
      return { ...state, loading: action.payload };
    case ACTIONS.SET_ERROR:
      return { ...state, error: action.payload, loading: false };
    case ACTIONS.SET_SEARCH_TERM:
      return { ...state, searchTerm: action.payload };
    case ACTIONS.SET_FILTER:
      return { ...state, filter: action.payload };
    default:
      return state;
  }
}

// Create Context
const ContactContext = createContext(null);

// Context Provider Component
export function ContactProvider({ children }) {
  const [state, dispatch] = useReducer(contactReducer, initialState);

  // Fetch all contacts
  const fetchContacts = useCallback(async () => {
    dispatch({ type: ACTIONS.SET_LOADING, payload: true });
    try {
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error('Failed to fetch contacts');
      const data = await response.json();
      dispatch({ type: ACTIONS.SET_CONTACTS, payload: data });
    } catch (error) {
      dispatch({ type: ACTIONS.SET_ERROR, payload: error.message });
    }
  }, []);

  // Add new contact
  const addContact = useCallback(async (contactData) => {
    dispatch({ type: ACTIONS.SET_LOADING, payload: true });
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(contactData),
      });
      if (!response.ok) throw new Error('Failed to add contact');
      const newContact = await response.json();
      dispatch({ type: ACTIONS.ADD_CONTACT, payload: newContact });
      return newContact;
    } catch (error) {
      dispatch({ type: ACTIONS.SET_ERROR, payload: error.message });
      throw error;
    }
  }, []);

  // Update contact
  const updateContact = useCallback(async (id, contactData) => {
    dispatch({ type: ACTIONS.SET_LOADING, payload: true });
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, ...contactData }),
      });
      if (!response.ok) throw new Error('Failed to update contact');
      const updatedContact = await response.json();
      dispatch({ type: ACTIONS.UPDATE_CONTACT, payload: updatedContact });
      return updatedContact;
    } catch (error) {
      dispatch({ type: ACTIONS.SET_ERROR, payload: error.message });
      throw error;
    }
  }, []);

  // Delete contact
  const deleteContact = useCallback(async (id) => {
    dispatch({ type: ACTIONS.SET_LOADING, payload: true });
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Failed to delete contact');
      dispatch({ type: ACTIONS.DELETE_CONTACT, payload: id });
    } catch (error) {
      dispatch({ type: ACTIONS.SET_ERROR, payload: error.message });
      throw error;
    }
  }, []);

  // Get single contact
  const getContact = useCallback(async (id) => {
    try {
      const response = await fetch(`${API_URL}/${id}`);
      if (!response.ok) throw new Error('Failed to fetch contact');
      return await response.json();
    } catch (error) {
      dispatch({ type: ACTIONS.SET_ERROR, payload: error.message });
      throw error;
    }
  }, []);

  // Set search term
  const setSearchTerm = useCallback((term) => {
    dispatch({ type: ACTIONS.SET_SEARCH_TERM, payload: term });
  }, []);

  // Set filter
  const setFilter = useCallback((filter) => {
    dispatch({ type: ACTIONS.SET_FILTER, payload: filter });
  }, []);

  // Filtered and searched contacts
  const filteredContacts = useMemo(() => {
    let result = [...state.contacts];

    // Apply search
    if (state.searchTerm) {
      const term = state.searchTerm.toLowerCase();
      result = result.filter(
        (contact) =>
          contact.firstName.toLowerCase().includes(term) ||
          contact.lastName.toLowerCase().includes(term) ||
          contact.email.toLowerCase().includes(term) ||
          contact.phone.toLowerCase().includes(term)
      );
    }

    // Apply filter/sort
    switch (state.filter) {
      case 'firstName':
        result.sort((a, b) => a.firstName.localeCompare(b.firstName));
        break;
      case 'lastName':
        result.sort((a, b) => a.lastName.localeCompare(b.lastName));
        break;
      case 'oldest':
        result.sort((a, b) => a.id - b.id);
        break;
      default:
        // Default order (newest first)
        result.sort((a, b) => b.id - a.id);
        break;
    }

    return result;
  }, [state.contacts, state.searchTerm, state.filter]);

  // Load contacts on mount
  useEffect(() => {
    fetchContacts();
  }, [fetchContacts]);

  const value = useMemo(
    () => ({
      contacts: state.contacts,
      filteredContacts,
      loading: state.loading,
      error: state.error,
      searchTerm: state.searchTerm,
      filter: state.filter,
      fetchContacts,
      addContact,
      updateContact,
      deleteContact,
      getContact,
      setSearchTerm,
      setFilter,
    }),
    [
      state.contacts,
      filteredContacts,
      state.loading,
      state.error,
      state.searchTerm,
      state.filter,
      fetchContacts,
      addContact,
      updateContact,
      deleteContact,
      getContact,
      setSearchTerm,
      setFilter,
    ]
  );

  return <ContactContext.Provider value={value}>{children}</ContactContext.Provider>;
}

// Custom hook to use the context
export function useContacts() {
  const context = useContext(ContactContext);
  if (!context) {
    throw new Error('useContacts must be used within a ContactProvider');
  }
  return context;
}

export default ContactContext;
