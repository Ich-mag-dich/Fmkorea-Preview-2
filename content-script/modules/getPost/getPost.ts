import axios from "axios";
const GetPost = async (postHref: string): Promise<any> => {
  const getPost = async (): Promise<any> => {
    const post = axios
      .get(postHref)
      .then(res => {
        res.data;
        throw Error(res.data);
      })
      .catch(err => {
        console.log(err);
        return err;
      });
    return await post;
  };
  return await getPost();
};

export default GetPost;
