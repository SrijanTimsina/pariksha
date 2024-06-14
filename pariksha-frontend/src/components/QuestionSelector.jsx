import React from "react";
import { FaCheck } from "react-icons/fa";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
} from "@chakra-ui/react";

export default function QuestionSelector({
  subjects,
  questionSelectorCount,
  jumpToQuestion,
  userAnswers,
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Button onClick={onOpen}>Open Question Selector</Button>

      <Modal isOpen={isOpen} onClose={onClose} scrollBehavior={"inside"}>
        <ModalOverlay />
        <ModalContent top={8} maxW="640px">
          <ModalHeader>Select Question To Jump </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <div className="mt-4 flex w-full flex-col gap-8 pb-6">
              {subjects.map((subject, index) => (
                <div className="w-full" key={index}>
                  <p className="mb-4 font-semibold">{subject.name}</p>
                  <div className="flex flex-wrap gap-2">
                    {subject.questions.map((question, idx) => (
                      <button
                        key={idx}
                        onClick={() =>
                          jumpToQuestion(
                            idx + 1 + index * questionSelectorCount
                          )
                        }
                        className="h-10 w-14 rounded bg-gray-100 px-2 py-1 text-gray-800 hover:bg-gray-200"
                      >
                        {userAnswers.hasOwnProperty(question._id) ? (
                          <FaCheck className="w-full" />
                        ) : (
                          idx + 1 + index * questionSelectorCount
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
