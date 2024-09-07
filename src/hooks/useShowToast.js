import { useToast } from "@chakra-ui/react";

// This is a custom hook that will call a toast for us, so we don't have to write so much code everytime we want to use toast.
const useShowToast = () => {
  const toast = useToast();

  const showToast = (title, description, status) => {
    toast({
      title: title,
      description: description,
      status: status,
      duration: 3000,
      isClosable: true,
    });
  };

  return showToast;
};

export default useShowToast;
