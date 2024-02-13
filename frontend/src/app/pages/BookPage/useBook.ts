const useBook = (bookId?: string) => {
    return useQuery(GetBook, {
      skip
      variables: { bookId },
    });
  };

  export default useBook;
