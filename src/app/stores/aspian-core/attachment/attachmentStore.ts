import {CoreRootStore} from "../CoreRootStore";
import {action, observable, runInAction} from "mobx";
import agent from "../../../api/aspian-core/agent";

export default class AttachmentStore {
    coreRootStore: CoreRootStore;

    constructor(coreRootStore: CoreRootStore) {
        this.coreRootStore = coreRootStore;
    }

    @observable uploadingFile = false;
    @observable deleting = false;

    @action uploadFile = async (file: Blob) => {
        this.uploadingFile = true;
        try {
            const uploadedFile = await agent.Attachments.uploadFile(file);
            runInAction("uploadFile action - remove loading", () => {
                this.uploadingFile = false;
            })
        } catch (error) {
            console.log(error);
            throw error;
        } finally {
            runInAction('uploadFile action (finally) - remove loading', () => {
                this.uploadingFile = false;
            });
        }
    }

    @action deleteUploadedTusFile = async (tusFileId: string) => {
        try {
            this.deleting = true;
            await agent.Attachments.deleteTusFile(tusFileId);
            runInAction('deleteUploadedTusFile action - remove loading', () => {
                this.deleting = false;
            });
        } catch (error) {
            console.log(error);
            runInAction('deleteUploadedTusFile action (error) - remove loading', () => {
                this.deleting = false;
            });
        }
    }
}