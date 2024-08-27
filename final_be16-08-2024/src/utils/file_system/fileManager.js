import fs from "fs";

export class FileManager {
    constructor(path) {
        this.PATH = path;
    }

    async saveRecords(products) {
        try {
            await fs.promises.writeFile(this.PATH, JSON.stringify(products, null, 2));
            console.log(`Records saved to ${this.PATH} successfully.`);
        } catch (error) {
            console.error(`Error saving records to ${this.PATH}:`, error);
        }
    }

    async readRecords() {
        try {
            const exist = fs.existsSync(this.PATH);
            if (exist) {
                const content = await fs.promises.readFile(this.PATH, "utf-8");
                if (content.trim() === "") {
                    console.log(`File ${this.PATH} exists but is empty.`);
                    return [];
                }
                let products;
                try {
                    products = JSON.parse(content);
                    console.log(`Records read from ${this.PATH} successfully.`);
                } catch (error) {
                    console.error(`Error parsing JSON from ${this.PATH}:`, error);
                    return [];
                }
                return products;
            } else {
                console.log(`File ${this.PATH} does not exist. Creating new file.`);
                await fs.promises.writeFile(this.PATH, "[]");
                return [];
            }
        } catch (error) {
            console.error(`Error reading records from ${this.PATH}:`, error);
            return [];
        }
    }
}
