import axios from "axios";
const GetPost = async postHref => {
  const get_post = () => {
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
    return post;
  };
  return await get_post();
};

export default GetPost;
