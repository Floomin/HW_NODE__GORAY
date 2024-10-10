import fs from 'fs';
import path from 'path';

// Path to the products store
const productsFilePath = path.join('resources', 'products.store.json');

// Function to read products from file
export const readProducts = () => {
    return new Promise((resolve, reject) => {
        fs.readFile(productsFilePath, 'utf-8', (err, data) => {
            if (err) {
                return reject('Failed to read products data');
            }
            resolve(JSON.parse(data));
        });
    });
};

// Function to write products to file
export const writeProducts = (products) => {
    return new Promise((resolve, reject) => {
        fs.writeFile(productsFilePath, JSON.stringify(products, null, 2), 'utf-8', (err) => {
            if (err) {
                return reject('Failed to write products data');
            }
            resolve();
        });
    });
};

export const readProductsFile = async () => {
    const data = await fs.promises.readFile(productsFilePath, 'utf-8');
    return JSON.parse(data);
};

export const writeProductsFile = async (products) => {
    await fs.promises.writeFile(productsFilePath, JSON.stringify(products, null, 2));
};