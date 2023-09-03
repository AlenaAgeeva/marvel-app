import ComicsList from "../comicsList/ComicsList";
import AppBanner from "../appBaner/AppBaner";
import { Helmet } from "react-helmet";

const ComicsPage = () => {
  return (
    <>
      <Helmet>
        <meta name="description" content="Page withh all Marvel comics" />
        <title>All Marvel comics</title>
      </Helmet>
      <AppBanner />
      <ComicsList />
    </>
  );
};

export default ComicsPage;
