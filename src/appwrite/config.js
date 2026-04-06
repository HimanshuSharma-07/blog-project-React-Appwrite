import conf from "../conf/conf"
import { Permission, Client, ID, Databases, Storage, Query, Role } from "appwrite"

export class Services {
    client = new Client()
    databases;
    storage;

    constructor() {
        this.client
            .setEndpoint(import.meta.env.VITE_APPWRITE_URL)
            .setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID)
        this.databases = new Databases(this.client)
        this.storage = new Storage(this.client) 
    }

    async createPost({ title, slug, content, featuredImage, status, userId, userName }) {
        try {
            return await this.databases.createDocument(
                conf.apiwriteDatabaseId,
                conf.apiwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId,
                    userName
                },
                
            )

        }
        catch (error) {
            console.log("Appwrite service :: creatrePost :: error", error)
        }
    }

    async updatePost(slug, { title, content, featuredImage, status }) {
        try {
            return await this.databases.updateDocument(
                conf.apiwriteDatabaseId,
                conf.apiwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,

                }
            )
        }
        catch (error) {
            console.log("Appwrite service :: updatePost :: error", error)
        }
    }

    async deletePost(slug) {
        try {
            await this.databases.deleteDocument(
                conf.apiwriteDatabaseId,
                conf.apiwriteCollectionId,
                slug,

            )
            return true
        }
        catch (error) {
            console.log("Appwrite service :: deletePost :: error", error)
            return false
        }
    }

    async getPost(slug) {
        try {
            return await this.databases.getDocument(
                conf.apiwriteDatabaseId,
                conf.apiwriteCollectionId,
                slug
            )
        }
        catch (error) {
            console.log("Appwrite service :: getPost :: error", error)
            throw error
        }
    }

    async getPosts(queries = [Query.equal("status", "active")]) {
        try {
            return await this.databases.listDocuments(
                conf.apiwriteDatabaseId,
                conf.apiwriteCollectionId,
                queries,

            )

        }
        catch (error) {
            console.log("Appwrite service :: getPosts :: error", error)
            return false
        }
    }

    // file upload services

    async uploadFile(file) {
        try {
            return await this.storage.createFile(
                conf.apiwriteBucketId,
                ID.unique(),
                file,
                [
                    Permission.read(Role.any())
                ]
            )
        }
        catch (error) {
            console.log("Appwrite service :: uploadFile :: error", error)
            return false
        }
    }

    async deleteFile(fileId) {
        try {
            return await this.storage.deleteFile(
                conf.apiwriteBucketId,
                fileId
            )
            return true
        }
        catch (error) {
            console.log("Appwrite service :: deleteFile :: error", error)
            return false
        }
    }

    getFileView(fileId) {
        return this.storage.getFileView(
            conf.apiwriteBucketId,
            fileId,
        )
    }

}

const services = new Services()

export default services