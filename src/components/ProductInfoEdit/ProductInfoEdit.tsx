import React, {useEffect, useState} from 'react';
import {ContentState, EditorState, convertToRaw} from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';

import Button from 'components/Button';
import ProductInfo from "components/ProductInfo";
import Alert from "components/Alert";

import {wysiwygToolbar} from './toolbar';
import {initialProduct} from "entities/product/product.store";
import {BTN_LABEL_BACK, BTN_LABEL_PREVIEW, BTN_LABEL_SAVE} from "components/ProductInfoEdit/store";

import {IProduct} from "entities/product/product.types";
import {useAppDispatch} from "store/index";
import {updateProduct} from "entities/product/product.slice";

import {Editor} from "react-draft-wysiwyg/dist/react-draft-wysiwyg";
import {IProductInfoEditProps} from "components/ProductInfoEdit/types";

import styles from './ProductInfoEdit.module.scss';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "draft-js/dist/Draft.css";

const ProductInfoEdit = ({mode, onFormChanged, product, setMode}: IProductInfoEditProps) => {
    const contentBlock = htmlToDraft(product.content || '');
    const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
    const [editorState, setEditorState] = useState(EditorState.createWithContent(contentState));
    const [htmlContent, setHtmlContent] = useState<string>(product.content || '<p></p>');
    const [contentChanged, setContentChanged] = useState<boolean>(false);
    const [publishError, setPublishError] = useState<string | null>(null);
    const [values, setValues] = useState<IProduct>(initialProduct);

    const dispatch = useAppDispatch();

    useEffect(() => {
        if (product) {
            setValues(product);
        }
    }, [product])

    useEffect(() => {
        if (htmlContent && contentChanged) {
            onFormChanged(true);
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
                {mode === 'edit' ? <>
                        <div className={styles.title}>{product.title}</div>
                        <Button onClick={() => {setMode('preview')}} theme="success">
                            {BTN_LABEL_PREVIEW}
                        </Button>
                    </> :
                    <>
                        <Button type="submit" theme="success">
                            {BTN_LABEL_SAVE}
                        </Button>
                        <Button onClick={() => { setMode('edit') }}>
                            {BTN_LABEL_BACK}
                        </Button>
                    </>
                }
            </div>

            {mode === 'edit' ?
                <div>
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
                <Alert
                    message={`Не заполнены обязательные поля: ${publishError}`}
                    title="Сохранение опубликованного продукта"
                />
            }
        </form>
    );
};

export default ProductInfoEdit;
