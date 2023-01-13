export interface ApiModalProps {
  open: boolean;
  setOpen: (item: boolean) => void;
  setOpenParentModal?: (item: boolean) => void;
}
