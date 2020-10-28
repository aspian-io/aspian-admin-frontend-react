import React, {Fragment, useContext, useEffect, useState} from "react";
import {Alert, Button, Col, Form, Input, message, Row, Spin, TreeSelect} from "antd";
import {useTranslation} from "react-i18next";
import {CoreRootStoreContext} from "../../../../app/stores/aspian-core/CoreRootStore";
import {observer} from "mobx-react-lite";
import {Taxonomy, TaxonomyTypeEnum, Term} from "../../../../app/models/aspian-core/taxonomy";
import slugify from "slugify";
import {v4} from "uuid";

export interface ITreeData {
    title: string;
    value: string;
    key: string;
    children: ITreeData[];
}

const Categories = () => {
    const {t} = useTranslation('core_postCreate');
    const coreRootStore = useContext(CoreRootStoreContext);
    const {loadingInitial, catTreeSelectRegistry, loadAntdTreeSelectCompatibleCategories, catTreeSelectLoading, createCategory} = coreRootStore.taxonomyStore;
    const [errorMsg, setErrorMsg] = useState<string | null>(null);
    const [isAddNewCategoryBtnDisabled, setIsAddNewCategoryBtnDisabled] = useState(true);
    const [categoriesArray, setCategoriesArray] = useState<ITreeData[]>([]);
    const [newCatParentTreeSelectVal, setNewCatParentTreeSelectVal] = useState<TreeSelect<string> | undefined>(undefined);

    // Parent Category Tree Select clear handler
    const clearSelectedNewCatParentTreeSelect = () => {
        setNewCatParentTreeSelectVal(undefined);
    }

    // States
    const [showAddCategoryForm, setShowAddCategoryForm] = useState(false);

    ///
    useEffect(() => {
        if (catTreeSelectRegistry.size === 0) {
            loadAntdTreeSelectCompatibleCategories()
                .then(() => setCategoriesArray(Array.from(catTreeSelectRegistry.values())));
        }
    }, [catTreeSelectRegistry, catTreeSelectRegistry.size, loadAntdTreeSelectCompatibleCategories])

    //
    let addNewCategoryParentTreeSelect:  TreeSelect<TreeSelect<string>> | null;

    //
    const [addNewCatForm] = Form.useForm();

    ///
    return (
        <Fragment>
            <Row style={{marginTop: "20px"}}>
                <Col span={24}>
                    <TreeSelect
                        loading={catTreeSelectLoading}
                        style={{width: '100%'}}
                        dropdownStyle={{maxHeight: 400, overflow: 'auto'}}
                        treeData={categoriesArray}
                        placeholder={t("collapse.categories.content.category-tree-select.placeholder")}
                        treeCheckable={true}
                        showArrow={true}
                        showSearch={true}
                        filterTreeNode={true}
                        treeNodeFilterProp="title"
                        treeCheckStrictly={true}
                        onChange={(value, node) => console.log("Tree Select OnSelect value: ", value)}
                    />
                </Col>
            </Row>
            <Row style={{marginTop: "20px"}}>
                <Button type="link" style={{fontSize: "12px", padding: "0"}}
                        onClick={() => setShowAddCategoryForm(!showAddCategoryForm)}>
                    {t("collapse.categories.content.add-new-category.name")}
                </Button>
            </Row>
            <Row style={showAddCategoryForm ? {display: "block", marginTop: "20px"} : {display: "none"}}>
                <Col span={24}>
                    <Spin spinning={loadingInitial}>
                        {errorMsg && <Fragment><Alert message={errorMsg} type="error" showIcon/><br/></Fragment>}

                        <Form form={addNewCatForm} id="addNewCategoryForm" onFinish={(value) => {

                            const taxonomy = new Taxonomy({
                                id: v4(),
                                type: TaxonomyTypeEnum.category,
                                parentId: (document.getElementById("newCategoryParentId") as HTMLInputElement).value ?
                                    (document.getElementById("newCategoryParentId") as HTMLInputElement).value :
                                    null,
                                term: new Term({
                                    id: v4(),
                                    name: value.newCategoryName,
                                    slug: slugify(value.newCategoryName)
                                })
                            });

                            createCategory(taxonomy)
                                .then(() => {
                                    addNewCatForm.resetFields();
                                    setErrorMsg(null);
                                    clearSelectedNewCatParentTreeSelect();
                                    setIsAddNewCategoryBtnDisabled(true)
                                    message.success('New category added successfully.');
                                    setCategoriesArray(Array.from(catTreeSelectRegistry.values()));
                                })
                                .catch((error) => {
                                    if (error.data.errors.TermName || error.data.errors.TermSlug) {
                                        setErrorMsg("Category name is already exist. Please change it and try again.");
                                    } else {
                                        setErrorMsg("Problem adding new category. Please try again later.");
                                    }
                                    message.error('Problem adding new category');
                                })
                        }
                        }>
                            <Form.Item
                                className="post-category__new-cat-name"
                                name="newCategoryName"
                                rules={[{required: true, message: 'Please input category name!'}]}
                                style={{fontSize: "12px"}}
                                id="newCategoryName"
                            >
                                <Input type="text"
                                       onChange={(e) => e.target.value.length ?
                                           setIsAddNewCategoryBtnDisabled(false) :
                                           setIsAddNewCategoryBtnDisabled(true)}
                                       placeholder={t("collapse.categories.content.add-new-category.category-name-input.placeholder")}
                                       className="add-new__add-new-cat--input"/>
                            </Form.Item>
                            <Form.Item>
                                <Input type="hidden" id="newCategoryParentId"/>
                                <TreeSelect
                                    value={newCatParentTreeSelectVal}
                                    loading={catTreeSelectLoading}
                                    style={{width: '100%'}}
                                    dropdownStyle={{maxHeight: 400, overflow: 'auto'}}
                                    treeData={categoriesArray}
                                    placeholder={t("collapse.categories.content.add-new-category.category-parent-select.placeholder")}
                                    showSearch={true}
                                    allowClear
                                    filterTreeNode={true}
                                    treeNodeFilterProp="title"
                                    multiple={false}
                                    onChange={(value: TreeSelect<string>) => {
                                        (document.getElementById("newCategoryParentId") as HTMLInputElement).value = value?.toString();
                                        setNewCatParentTreeSelectVal(value);
                                        }
                                    }
                                />
                            </Form.Item>
                            <Form.Item>
                                <Button type="primary" htmlType="submit" style={{fontSize: "12px"}}
                                        disabled={isAddNewCategoryBtnDisabled}>
                                    {t("collapse.categories.button")}
                                </Button>
                            </Form.Item>
                        </Form>
                    </Spin>
                </Col>
            </Row>
        </Fragment>
    );
}

export default observer(Categories);