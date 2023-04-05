import React, {lazy, useEffect, useState} from 'react';
import styles from './ProductInfoEdit.module.sass';
import {ContentState, EditorState, convertToRaw} from 'draft-js';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "draft-js/dist/Draft.css";
import {wysiwygToolbar} from './toolbar';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import ProductInfo from "components/ProductInfo";
import {IProduct} from "entities/product/product.types";
import {useAppDispatch} from "store/index";
import {updateProduct} from "entities/product/product.slice";
import AlertPublishProduct from "components/AlertPublishProduct";

import {Editor} from "react-draft-wysiwyg/dist/react-draft-wysiwyg";

interface ProductInfoEditProp {
    product: IProduct;
    onFormChanged: (value:boolean) => void;
    mode: 'edit' | 'preview';
    setMode(value: 'edit' | 'preview'): void;
}

const initialValues: IProduct = {
    id: null,
    content: null,
    active: false,
    categoryId: 0,
    title: "",
}

const ProductInfoEdit = (props: ProductInfoEditProp) => {
    const contentBlock = htmlToDraft(props.product.content || '');
    const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
    const [editorState, setEditorState] = useState(EditorState.createWithContent(contentState));
    const [htmlContent, setHtmlContent] = useState<string>(props.product.content || '<p></p>');
    const [contentChanged, setContentChanged] = useState<boolean>(false);
    const [publishError, setPublishError] = useState<string | null>(null);
    const [values, setValues] = useState<IProduct>(initialValues);

    const dispatch = useAppDispatch();

    useEffect(() => {
        if (props.product) {
            setValues(props.product);
        }
    }, [props.product])

    useEffect(() => {
        if (htmlContent && contentChanged) {
            props.onFormChanged(true);
        }
    }, [htmlContent]);

    const onEditorStateChange = (state: EditorState) => {
        const oldContent = htmlContent;
        const content = draftToHtml(convertToRaw(state.getCurrentContent()));
        setEditorState(state);
        if (content?.trim() !== oldContent?.trim()) {
            setContentChanged(true);
            setHtmlContent(content);
        }
    };

    function uploadImageCallBack(file: File) {
        return new Promise(
            (resolve, reject) => {
                const reader = new FileReader();
                reader.onload = e => resolve({data: {link: e.target?.result}});
                reader.onerror = e => reject(e);
                reader.readAsDataURL(file);
            });
    }

    const onSubmit = () => {
        const data = {
            content: values.content || '',
        };
        const descEmpty = data.content.trim() === '';
        if (values.active && descEmpty) {
            setPublishError("Описание");
        } else {
            setPublishError(null);
            dispatch(
                updateProduct({
                    id: values.id,
                    data: data,
                }),
            )
        }
    }

    return (
        <form onSubmit={onSubmit}>
            <div className={styles.headline}>
                {props.mode === 'edit' ? <>
                        <h1>{props.product.title}</h1>
                        <button
                            onClick={() => {
                                props.setMode('preview')
                            }}
                        >
                            Предпросмотр
                        </button>
                    </> :
                    <>
                        <button
                            className={styles.buttons}
                            type="submit"
                        >
                            Сохранить
                        </button>
                        <button
                            className={styles.buttons}
                            onClick={() => {
                                props.setMode('edit')
                            }}
                        >
                            Вернуться в редактор
                        </button>
                    </>
                }
            </div>

            {props.mode === 'edit' ?
                <div>
                    <label>Описание</label>
                    <div className={styles.wysiwygContainer}>
                        <Editor
                            editorClassName={styles.editor}
                            editorState={editorState}
                            localization={{
                                locale: 'ru',
                            }}
                            onEditorStateChange={onEditorStateChange}
                            toolbar={{
                                ...wysiwygToolbar,
                                image: {
                                    ...wysiwygToolbar.image,
                                    uploadCallback: uploadImageCallBack,
                                },
                            }}
                            toolbarClassName={styles.toolbar}
                            wrapperClassName="wrapperClassName"
                        />
                    </div>
                </div>
                : <ProductInfo product={values}/>
            }
            {publishError &&
                <AlertPublishProduct
                    message={`Не заполнены обязательные поля: ${publishError}`}
                    title="Сохранение опубликованного продукта"
                />
            }
        </form>
    );
};

export default ProductInfoEdit;
