import Dexie from "dexie";
// import {
//     versionAdmin,
//     versionUser,
//     adminStore,
//     userStore
// } from "data/dexSchema";

const db = new Dexie('SimpleAccountingAppDB');
db.version(2).stores({
    users: '++id,email,username,hashedPassword,companies,last_company',
    companies: '++id,company_id,user_id,companyName,companyType,companyRegNo,addressPhysical,addressPostal,email,telephone,website,taxNo,VATNo,users',
    accounts: '++id,company_id,number,name,class,category,stdAmt,contra',
    transactions: '++id,company_id,category,account_number_debit,account_number_credit,doc_number,amount,date,description,pmtalloc_date,pmtalloc_amount',
    customers: '++id,company_id,number,name,class,category,address_physical,address_postal,email,telephone,website,type',
    suppliers: '++id,company_id,number,name,class,category,address_physical,address_postal,email,telephone,website,type'
});
//there must be links between databases
//accounts-number of sub account with customers and suppliers number,
//transactions-account_number with accounts number
//the number on suppliers and customers to tie in with the sub account 
//number of accounts under accounts payable and accounts receivable

//account number cannot be edited once created and entries in account

async function getUsername(username) {
    return await db.users(username)
}

async function addAccount(accountData) {
    return await db.accounts.add(accountData);
}
async function deleteAccount(accountId) {
    try {
        await db.accounts.delete(accountId);
    } catch (error) {
        console.error('Error deleting account:', error);
    }
}
async function getAllCompanies() {
    return await db.companies.toArray();
}
async function getAllAccounts() {
    return await db.accounts.toArray();
}
async function addTransaction(accountData) {
    return await db.transactions.add(accountData);
}
async function getAllTransactions() {
    return await db.transactions.toArray();
}
async function addCustomer(accountData) {
    return await db.customers.add(accountData);
}
async function deleteCustomer(accountId) {
    try {
        await db.cusomers.delete(accountId);
    } catch (error) {
        console.error('Error deleting customer:', error);
    }
}
async function getAllCustomers() {
    return await db.customers.toArray();
}
async function addSupplier(accountData) {
    return await db.suppliers.add(accountData);
}
async function deleteSupplier(accountId) {
    try {
        await db.suppliers.delete(accountId);
    } catch (error) {
        console.error('Error deleting supplier:', error);
    }
}
async function getAllSuppliers() {
    return await db.suppliers.toArray();
}

async function updateAccount(id, updatedData) {
    try {
        await db.accounts.update(id, updatedData);
    } catch (error) {
        console.error('Error updating account:', error);
    }
}
async function updateCustomer(id, updatedData) {
    try {
        await db.customers.update(id, updatedData);
    } catch (error) {
        console.error('Error updating customers:', error);
    }
}
async function updateSupplier(id, updatedData) {
    try {
        await db.suppliers.update(id, updatedData);
    } catch (error) {
        console.error('Error updating account:', error);
    }
}

export {
    getAllCompanies,
    addAccount, deleteAccount, getAllAccounts, updateAccount,
    addTransaction, getAllTransactions,
    addCustomer, deleteCustomer, getAllCustomers,
    addSupplier, deleteSupplier, getAllSuppliers,
    updateCustomer, updateSupplier
}

export default db