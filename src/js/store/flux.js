const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			],
			contacts: []
		},
		actions: {
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},
			loadSomeData: async () => {
				try {
					const response = await fetch("https://playground.4geeks.com/apis/fake/contact/agenda");
					const data = await response.json();
					const store = getStore();
					const mergedContacts = [...store.contacts, ...data];
					setStore({ contacts: mergedContacts });
				} catch (error) {
					console.error("Error fetching data:", error);
				}
			},
			changeColor: (index, color) => {
				const store = getStore();
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});
				setStore({ demo: demo });
			},
			addContact: contact => {
				const store = getStore();
				const updatedContacts = store.contacts.map(existingContact => ({
					...existingContact,
					...contact
				}));
				setStore({ contacts: updatedContacts });
			},
			getAllAgendas: async () => {
				try {
					const response = await fetch("https://playground.4geeks.com/apis/fake/contact/agenda");
					const data = await response.json();
					return data;
				} catch (error) {
					console.error("Error fetching agendas:", error);
					return [];
				}
			},
			createAgenda: async agenda_slug => {
				try {
					const response = await fetch("https://playground.4geeks.com/apis/fake/contact/", {
						method: "POST",
						headers: {
							"Content-Type": "application/json"
						},
						body: JSON.stringify({
							agenda_slug: agenda_slug
						})
					});
					const data = await response.json();
					return data;
				} catch (error) {
					console.error("Error creating agenda:", error);
					return null;
				}
			},
			getContactsFromAgenda: async agenda_slug => {
				try {
					const response = await fetch(`https://playground.4geeks.com/apis/fake/contact/agenda/${agenda_slug}`);
					const data = await response.json();
					return data;
				} catch (error) {
					console.error("Error fetching contacts from agenda:", error);
					return [];
				}
			},
			getOneContact: async contact_id => {
				try {
					const response = await fetch(`https://playground.4geeks.com/apis/fake/contact/${contact_id}`);
					const data = await response.json();
					return data;
				} catch (error) {
					console.error("Error fetching one contact:", error);
					return null;
				}
			},
			deleteOneContact: async contact_id => {
				try {
					await fetch(`https://playground.4geeks.com/apis/fake/contact/${contact_id}`, {
						method: "DELETE"
					});
			
				} catch (error) {
					console.error("Error deleting one contact:", error);
				}
			},
			deleteAllContactsFromAgenda: async agenda_slug => {
				try {
					await fetch(`https://playground.4geeks.com/apis/fake/contact/agenda/${agenda_slug}`, {
						method: "DELETE"
					});
		
				} catch (error) {
					console.error("Error deleting all contacts from agenda:", error);
				}
			},
			createContact: async contactData => {
				try {
					const response = await fetch("https://playground.4geeks.com/apis/fake/contact/", {
						method: "POST",
						headers: {
							"Content-Type": "application/json"
						},
						body: JSON.stringify(contactData)
					});
					const data = await response.json();
					return data;
				} catch (error) {
					console.error("Error creating contact:", error);
					return null;
				}
			},
			updateContact: async (contact_id, updatedData) => {
				try {
					const response = await fetch(`https://playground.4geeks.com/apis/fake/contact/${contact_id}`, {
						method: "PUT",
						headers: {
							"Content-Type": "application/json"
						},
						body: JSON.stringify(updatedData)
					});
					const data = await response.json();
					return data;
				} catch (error) {
					console.error("Error updating contact:", error);
					return null;
				}
			}
		}
	};
};

export default getState;