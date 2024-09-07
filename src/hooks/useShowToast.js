import { useToast } from "@chakra-ui/react";
import { useCallback } from "react";

// This is a custom hook that will call a toast for us, so we don't have to write so much code everytime we want to use toast.
const useShowToast = () => {
  const toast = useToast();

  // We are using a useCallback so that we don't get an infinite loop error. On each render, this function will be stored in a different location in memory, so we need to catch this. We'll use a useCallback, with the function as the first argument, and the toast as the second. useCallback to prevent infinite loop, by catching the function.
  const showToast = useCallback(
    (title, description, status) => {
      toast({
        title: title,
        description: description,
        status: status,
        duration: 3000,
        isClosable: true,
      });
    },
    [toast]
  );

  return showToast;
};

export default useShowToast;
