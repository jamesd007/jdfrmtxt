import Dexie from "dexie";
// import {
//     versionAdmin,
//     versionUser,
//     adminStore,
//     userStore
// } from "data/dexSchema";
// TEDTEST OLD begin
// const db = new Dexie('SimpleAccountingAppDB');
// db.version(2).stores({
//     users: '++id,email,username,hashedPassword,companies,last_company',
//     companies: '++id,company_id,user_id,companyName,companyType,companyRegNo,addressPhysical,addressPostal,email,telephone,website,taxNo,VATNo,users',
//     accounts: '++id,company_id,number,name,class,category,stdAmt,contra',
//     transactions: '++id,company_id,category,account_number_debit,account_number_credit,doc_number,amount,date,description,pmtalloc_date,pmtalloc_amount',
//     customers: '++id,company_id,number,name,class,category,address_physical,address_postal,email,telephone,website,type',
//     suppliers: '++id,company_id,number,name,class,category,address_physical,address_postal,email,telephone,website,type'
// });
//TEDTEST OLD END
//there must be links between databases
//accounts-number of sub account with customers and suppliers number,
//transactions-account_number with accounts number
//the number on suppliers and customers to tie in with the sub account 
//number of accounts under accounts payable and accounts receivable

//account number cannot be edited once created and entries in account

//---TEDTEST testing begin

// Define your schema (same format and fields for all databases)
const databaseSchema = {
  myTable: '++id, name, value',
  users: '++id,email,username,hashedPassword,companies,last_company',
  company: '++id,company_id,user_id,companyName,companyType,companyRegNo,addressPhysical,addressPostal,email,telephone,website,taxNo,VATNo,users',
  accounts: '++id,company_id,number,name,class,category,stdAmt,contra',
  transactions: '++id,company_id,category,account_number_debit,account_number_credit,doc_number,amount,date,description,pmtalloc_date,pmtalloc_amount',
  customers: '++id,company_id,number,name,class,category,address_physical,address_postal,email,telephone,website,type',
  suppliers: '++id,company_id,number,name,class,category,address_physical,address_postal,email,telephone,website,type'
};

const userDatabaseSchema = {
    myTable: '++id, name, value',
    users: '++id,email,username,hashedPassword,companies,last_company',
}

// Create an object to store your database instances
const companyDatabases = {};

// Function to create a new database for a company
function createCompanyDatabase(companyId) {
  const db = new Dexie(companyId);
  db.version(1).stores(databaseSchema);
  return db;
}

// Create an object to store user database instances
const userDatabases = {};

// Function to create a new database for a user
export function createUserDatabase(userId) {
    const db = new Dexie(userId);
    db.version(1).stores(userDatabaseSchema);
    userDatabases[userId] = db;
    return db;
}

// Function to add the user to the user database
export async function addUserToUserDatabase(userId, userData) {
    const db = userDatabases[userId];
    if (db) {
        await db.transaction('rw', db.users, async () => {
            await db.users.add(userData);
        });
    } else {
        throw new Error('User database does not exist for user ID: ' + userId);
    }
}

// Function to switch to a user's database
export function switchToUserDatabase(userId) {
    const activeDB = userDatabases[userId];
    if (!activeDB) {
        throw new Error('User database does not exist for user ID: ' + userId);
    }
    return activeDB;
}

// Function to add a new company database
function addCompanyDatabase(companyId) {
  if (!companyDatabases[companyId]) {
    companyDatabases[companyId] = createCompanyDatabase(companyId);
  } else {
    console.error(`Database "${companyId}" already exists.`);
  }
}

// Switching between databases
function switchToCompanyDatabase(companyId) {
  const activeDB = companyDatabases[companyId];
  console.log("tedtesta companyId=",companyId)
  console.log("tedtesta activeDB=",activeDB)
  // Use the activeDB instance for database operations
}
//TEDTEST need to have a deleteCompanyDtabase
// Example usage:
// const activeCompany = 'Company1'; // The user can specify the company name
// addCompanyDatabase(activeCompany); // Create the database if it doesn't exist
// switchToCompanyDatabase(activeCompany);

//---TEDTEST testing end

async function getUsername(db,username) {
    return await db.users.where({ username: username }).first();

    // return await db.users(username)
}

async function addAccount(db,accountData) {
    console.log("tedtestA accountData=",accountData)
    return await db.accounts.add(accountData);

    // return await db.accounts.add(accountData);
}

//TEDTEST the next functions need to be modified for new multiple databases
async function deleteAccount(db,accountId) {
    try {
        await db.accounts.delete(accountId);
    } catch (error) {
        console.error('Error deleting account:', error);
    }
}
async function getAllCompanies(db) {
    return await db.companies.toArray();
}
async function getAllAccounts(db) {
    return await db.accounts.toArray();
}
async function addTransaction(db,accountData) {
    return await db.transactions.add(accountData);
}
async function getAllTransactions(db) {
    return await db.transactions.toArray();
}
async function addCustomer(db,accountData) {
    return await db.customers.add(accountData);
}
async function deleteCustomer(db,accountId) {
    try {
        await db.cusomers.delete(accountId);
    } catch (error) {
        console.error('Error deleting customer:', error);
    }
}
async function getAllCustomers(db) {
    return await db.customers.toArray();
}
async function addSupplier(db,accountData) {
    return await db.suppliers.add(accountData);
}
async function deleteSupplier(db,accountId) {
    try {
        await db.suppliers.delete(accountId);
    } catch (error) {
        console.error('Error deleting supplier:', error);
    }
}
async function getAllSuppliers(db) {
    return await db.suppliers.toArray();
}

async function updateAccount(db,id, updatedData) {
    try {
        await db.accounts.update(id, updatedData);
    } catch (error) {
        console.error('Error updating account:', error);
    }
}
async function updateCustomer(db,id, updatedData) {
    try {
        await db.customers.update(id, updatedData);
    } catch (error) {
        console.error('Error updating customers:', error);
    }
}
async function updateSupplier(db,id, updatedData) {
    try {
        await db.suppliers.update(id, updatedData);
    } catch (error) {
        console.error('Error updating account:', error);
    }
}

export {
    getAllCompanies,getUsername,
    addAccount, deleteAccount, getAllAccounts, updateAccount,
    addTransaction, getAllTransactions,
    addCustomer, deleteCustomer, getAllCustomers,
    addSupplier, deleteSupplier, getAllSuppliers,
    updateCustomer, updateSupplier
}

// export default db