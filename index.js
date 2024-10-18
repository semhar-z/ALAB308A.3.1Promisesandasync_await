// Importing database functions. DO NOT MODIFY THIS LINE.
import { central, db1, db2, db3, vault } from "./databases.js";


// Part 1: The Scenario

// Part 2: The Implementation

  async function getUserData(id) {

    const dbs = {
        db1: db1,
        db2: db2,
        db3: db3
      };

  try {
    
    if (id < 1 || id > 10 || typeof id !== 'number') {
      return Promise.reject('That is Invalid ID');
    }

    // Fetch which database to use from the central function
    const dbName = await central(id);

    
    const [dbData, vaultData] = await Promise.all([
      dbs[dbName](id),  
      vault(id)        
    ]);

    // Return the combined user data in the required format
    return {
      id,
      name: vaultData.name,
      username: dbData.username,
      email: vaultData.email,
      address: vaultData.address,
      phone: vaultData.phone,
      website: dbData.website,
      company: dbData.company
    };
  } catch (error) {
    // Handle errors and provide useful feedback
    return Promise.reject(`Error fetching data: ${error.message}`);
  }
}


getUserData(10)  // this outputs data for the person with Id 10 
  .then((data) => console.log(data))
  .catch((error) => console.error(error));

getUserData(11)  // this outputs the error message "That is invalid ID"
  .then((data) => console.log(data))
  .catch((error) => console.error(error));

