import React, {FC} from "react";
import {TreeSelect} from "antd";
import {useTranslation} from "react-i18next";
import {IStoreState} from "../../../../app/store/rootReducerTypes";
import {ITreeData} from "./Categories";
import {connect} from "react-redux";
import {loadAntdTreeSelectCompatiblePosts} from "../../../../app/store/aspian-core/actions";

interface IParentPostProps {
    postsTreeSelectLoading: boolean;
    postsTreeSelect: ITreeData[];
    loadAntdTreeSelectCompatiblePosts: Function;
}

const ParentPost: FC<IParentPostProps> = ({postsTreeSelectLoading, postsTreeSelect, loadAntdTreeSelectCompatiblePosts}) => {
    const {t} = useTranslation('core_postCreate');

    ///
    return (
        <TreeSelect
            loading={postsTreeSelectLoading}
            style={{width: '100%'}}
            dropdownStyle={{maxHeight: 400, overflow: 'auto'}}
            treeData={postsTreeSelect}
            placeholder={t("collapse.parent-post.content.parent-post-select.placeholder")}
            showSearch={true}
            filterTreeNode={true}
            treeNodeFilterProp="title"
            onDropdownVisibleChange={(open) => {
                if (open && postsTreeSelect.length === 0) {
                    loadAntdTreeSelectCompatiblePosts()
                }
            }}
        />
    );
}

// Redux State To Map
const mapStateToProps = ({post}: IStoreState): { postsTreeSelectLoading: boolean, postsTreeSelect: ITreeData[] } => {
    return {postsTreeSelectLoading: post.postsTreeSelectLoading, postsTreeSelect: post.postsTreeSelect}
}

// Redux Dispatch To Map
const mapDispatchToProps = {
    loadAntdTreeSelectCompatiblePosts
}

export default connect(mapStateToProps, mapDispatchToProps)(ParentPost);