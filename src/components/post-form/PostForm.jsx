import React , {useCallback} from "react";
import {useForm} from 'react-hook-form';
import {Button , Input , Select , RTE} from '../index';
import { service as appwriteService } from "../../appwrite/config";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function PostForm({ post }) {
    const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
        defaultValues: {
            tittle: post?.tittle || "",
            slug: post?.$id || "",
            content: post?.content || "",
            status: post?.status || "active",
        },
    });

    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData);
    console.log(userData , "user");
    
    const submit = async (data) => {
       try {
         if (post) {
             const file = data.image[0] ? await appwriteService.uploadFile(data.image[0]) : null;
 
             if (file) {
                 appwriteService.deleteFile(post.featuredImage);
             }
 
             const dbPost = await appwriteService.updatePost(post.$id, {
                 ...data,
                 featuredimage: file ? file.$id : undefined,
             });
 
             if (dbPost) {
                 navigate(`/post/${dbPost.$id}`);
             }
         } else {
             const file = await appwriteService.uploadFile(data.image[0]);
                // console.log(file);
                
             if (file) {
                 const fileId = file.$id;
                //  console.log(fileId);
                 
                 data.featuredimage = fileId;
                 // console.log(data.featuredImage);
                 const dbPost = await appwriteService.createPost({ ...data, userId: userData.$id });
                // console.log(dbPost);
                
                 if (dbPost) {
                     navigate(`/post/${dbPost.$id}`);
                 }
             }
         }
       } catch (error) {
        console.log("submit error: ",error);
       }
    };

    const slugTransform = useCallback((value) => {
        if (value && typeof value === "string")
            return value
                .trim()
                .toLowerCase()
                .replace(/[^a-zA-Z\d\s]+/g, "-")
                .replace(/\s/g, "-");

        return "";
    }, []);

    React.useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === "tittle") {
                setValue("slug", slugTransform(value.tittle), { shouldValidate: true });
            }
        });

        return () => subscription.unsubscribe();
    }, [watch, slugTransform, setValue]);

    return (
        <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
            <div className="w-2/3 px-2">
                <Input
                    label="Tittle :"
                    placeholder="Tittle"
                    className="mb-4"
                    {...register("tittle", { required: true })}
                />
                <Input
                    label="Slug :"
                    placeholder="Slug"
                    className="mb-4"
                    {...register("slug", { required: true })}
                    onInput={(e) => {
                        setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                    }}
                />
                <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} />
            </div>
            <div className="w-1/3 px-2">
                <Input
                    label="Featured Image :"
                    type="file"
                    className="mb-4"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("image", { required: !post })}
                />
                {post && (
                    <div className="w-full mb-4">
                        <img
                            src={appwriteService.getFilePreview(post.featuredimage)}
                            alt={post.title}
                            className="rounded-lg"
                        />
                    </div>
                )}
                <Select
                    options={["active", "inactive"]}
                    label="Status"
                    className="mb-4"
                    {...register("status", { required: true })}
                />
                <Button type="submit" bgColor={post ? "bg-green-500" : undefined} className="w-full">
                    {post ? "Update" : "Submit"}
                </Button>
            </div>
        </form>
    );
}