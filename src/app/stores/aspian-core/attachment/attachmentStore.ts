import {CoreRootStore} from "../CoreRootStore";
import {action, observable, runInAction} from "mobx";
import agent from "../../../api/aspian-core/agent";
import {IPost} from "../../../models/aspian-core/post";
import {IFileBrowser} from "../../../models/aspian-core/attachment";
import {IFileBrowserAntdTable} from "../../../../components/aspian-core/media/fileBrowser/types";

export default class AttachmentStore {
    coreRootStore: CoreRootStore;

    constructor(coreRootStore: CoreRootStore) {
        this.coreRootStore = coreRootStore;
    }

    @observable fileBrowserLoading = false;
    @observable uploadingFile = false;
    @observable deleting = false;

    @observable fileBrowserRegistry = new Map<string, IFileBrowser>();
    @observable addedFileKeysFromFileBrowser : string[] = [];

    @action fileBrowser = async () => {
        this.fileBrowserLoading = true;
        try {
            const files = await agent.Attachments.fileBrowser();
            runInAction("fileBrowser action - registry loading and remove loading", () => {
                files.map((f) => this.fileBrowserRegistry.set(f.id, f));
                this.fileBrowserLoading = false;
            })
        } catch (error) {
            console.log(error);
            runInAction("fileBrowser action (error) - remove loading", () => {
                this.fileBrowserLoading = false;
            })
            throw error;
        }
    }

    @action fileBrowserAddFileKey = (fileKey: string) => {
        this.addedFileKeysFromFileBrowser.push(fileKey);
    }

    @action removeAddedFileKeyFromArray = (fileKey: string) => {
        this.addedFileKeysFromFileBrowser = this.addedFileKeysFromFileBrowser.filter(fk => fk !== fileKey);
    }

    @action clearAllAddedFileKeysFromFileBrowser = () => {
        this.addedFileKeysFromFileBrowser = [];
    }

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