import { useRecoilState, useRecoilValue } from "recoil";

const NewPagination = ({
  show,
  atom,
  prevSelector,
  nextSelector,
  showFirstSelector,
  showLastSelector,
  totalPage,
}) => {
  const [activePage, setActivePage] = useRecoilState(atom);
  const prevPage = useRecoilValue(prevSelector);
  const nextPage = useRecoilValue(nextSelector(totalPage));
  const showFirstPage = useRecoilValue(showFirstSelector);
  const showLastPage = useRecoilValue(showLastSelector(totalPage));
  return show ? (
    <div className="row mt-3">
      <div className="col-md-12 d-flex justify-content-center">
        <nav aria-label="Page navigation example">
          <ul className="pagination">
            {showFirstPage && (
              <>
                <li
                  className="pagination-btn mx-2 cursor-pointer"
                  onClick={() => setActivePage(prevPage)}
                >
                  <div>
                    <i className="bi bi-arrow-left-short fs-5 pagination-btn-shadow"></i>
                  </div>
                </li>

                <li className="pagination-btn cursor-pointer">
                  <div className="" onClick={() => setActivePage(prevPage)}>
                    {prevPage}
                  </div>
                </li>
              </>
            )}
            <li className="active-page pagination-item cursor-pointer">
              <div className="px-4" onClick={() => setActivePage(activePage)}>
                {activePage}
              </div>
            </li>
            {showLastPage && (
              <>
                <li className="pagination-btn cursor-pointer">
                  <div className="" onClick={() => setActivePage(nextPage)}>
                    {nextPage}
                  </div>
                </li>

                <li
                  className="pagination-btn mx-2 cursor-pointer"
                  onClick={() => setActivePage(nextPage)}
                >
                  <div>
                    <i className="bi bi-arrow-right-short fs-5 pagination-btn-shadow"></i>
                  </div>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </div>
  ) : null;
};

export default NewPagination;
