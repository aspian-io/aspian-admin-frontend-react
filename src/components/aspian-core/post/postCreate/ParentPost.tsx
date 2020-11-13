import React, {useContext, useEffect, useState} from "react";
import {TreeSelect} from "antd";
import {useTranslation} from "react-i18next";
import {CoreRootStoreContext} from "../../../../app/stores/aspian-core/CoreRootStore";
import {ITreeData} from "./Categories";

const ParentPost = () => {
    const {t} = useTranslation('core_postCreate');
    const coreRootStore = useContext(CoreRootStoreContext);
    const {postsTreeSelectLoading, postsTreeSelectRegistry, loadAntdTreeSelectCompatiblePosts} = coreRootStore.postStore;

    const [postsArray, setPostsArray] = useState<ITreeData[]>([]);

    ///
    useEffect(() => {
        if (postsTreeSelectRegistry.size === 0) {
            loadAntdTreeSelectCompatiblePosts()
                .then(() => setPostsArray(Array.from(postsTreeSelectRegistry.values())));
        }
    }, [loadAntdTreeSelectCompatiblePosts, postsTreeSelectRegistry])

    ///
    return (
        <TreeSelect
            loading={postsTreeSelectLoading}
            style={{width: '100%'}}
            dropdownStyle={{maxHeight: 400, overflow: 'auto'}}
            treeData={postsArray}
            placeholder={t("collapse.parent-post.content.parent-post-select.placeholder")}
            showSearch={true}
            filterTreeNode={true}
            treeNodeFilterProp="title"
        />
    );
}

export default ParentPost;