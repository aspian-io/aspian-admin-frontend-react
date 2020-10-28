import React from "react";
import {TreeSelect} from "antd";
import {useTranslation} from "react-i18next";

const ParentPost = () => {
    const { t } = useTranslation('core_postCreate');
    // Category tree init data for test
    const categoryTreeData = [
        {
            title: 'Node1',
            value: '0-0',
            key: '0-0',
            children: [
                {
                    title: 'Child Node1',
                    value: '0-0-0',
                    key: '0-0-0',
                },
            ],
        },
        {
            title: 'Node2',
            value: '0-1',
            key: '0-1',
            children: [
                {
                    title: 'Child Node3',
                    value: '0-1-0',
                    key: '0-1-0',
                },
                {
                    title: 'Child Node4',
                    value: '0-1-1',
                    key: '0-1-1',
                    children: [
                        {
                            title: 'Child Node6',
                            value: '0-1-1-0',
                            key: '0-1-1-0',
                        },
                        {
                            title: 'Child Node7',
                            value: '0-1-1-1',
                            key: '0-1-1-1',
                            children: [
                                {
                                    title: 'Child Node8',
                                    value: '0-1-1-1-0',
                                    key: '0-1-1-1-0',
                                },
                                {
                                    title: 'Child Node9',
                                    value: '0-1-1-1-1',
                                    key: '0-1-1-1-1',
                                },
                                {
                                    title: 'Child Node10',
                                    value: '0-1-1-1-2',
                                    key: '0-1-1-1-2',
                                },
                                {
                                    title: 'sss',
                                    value: '0-1-1-1-3',
                                    key: '0-1-1-1-3',
                                },
                            ]
                        },
                    ]
                },
                {
                    title: 'Child Node5',
                    value: '0-1-2',
                    key: '0-1-2',
                },
            ],
        },
    ]

    ///
    return (
        <TreeSelect
            style={{width: '100%'}}
            dropdownStyle={{maxHeight: 400, overflow: 'auto'}}
            treeData={categoryTreeData}
            placeholder={t("collapse.parent-post.content.parent-post-select.placeholder")}
            showSearch={true}
            filterTreeNode={true}
            treeNodeFilterProp="title"
        />
    );
}

export default ParentPost;