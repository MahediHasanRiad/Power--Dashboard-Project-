import { useEffect } from "react";
import img from "../../../public/profile.png";
import ArticleCard from "./components/article-card";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@/store/store";
import { getAllArticleThunk } from "./redux/get-all-article.thunk";
import { toast } from "sonner";
import { Loading } from "@/shared/isLoading";
import Error from "@/shared/isError";

function ArticleListPage() {

  const dispatch = useDispatch<AppDispatch>()
  const {isError, isLoading, articles} = useSelector((state: RootState) => state.article )

  useEffect(() => {
    ;(async () => {
      try {
        await dispatch(getAllArticleThunk()).unwrap()
      } 
      catch (error) {
        toast.error('Field to Load Articles')
        console.error(error)
      }
      
    })()
  }, [])

  console.log('articles', articles)

  if (isLoading) {
      return (
        <Loading />
      );
    }
  
    if (isError) {
      return (
        <Error isError={isError} />
      );
    }

  return (
    <section>
      <h1 className="text-white text-3xl md:text-4xl font-bold leading-tight tracking-tight px-8">
        All Articles
      </h1>

      {/* card  */}
      <section className="grid lg:grid-cols-4 md:grid-cols-3 m-3">
        {articles?.map(article => (
          <ArticleCard
          key={article.id}
          id={article.id}
          img={article.image_url}
          title={article.title}
          category={article.category}
          description={article.description}
        />
        ))}
      </section>
    </section>
  );
}

export default ArticleListPage;
