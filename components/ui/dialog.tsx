import * as DialogPrimitive from "@radix-ui/react-dialog";
import React from "react";
import { IoClose } from "react-icons/io5";
import { CSS, styled } from "stitches.config";
import IconButton from "./iconButton";
import { fadeIn, fadeOut } from "./keyframes";
import { overlayStyles } from "./overlay";
import { panelStyles } from "./panel";
import Svg from "./svg";

type DialogProps = React.ComponentProps<typeof DialogPrimitive.Root> & {
  children: React.ReactNode;
};

const StyledOverlay = styled(DialogPrimitive.Overlay, overlayStyles, {
  position: "fixed",
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
  '&[data-state="open"]': {
    animation: `${fadeIn} 500ms forwards`
  },
  '&[data-state="closed"]': {
    animation: `${fadeOut} 500ms forwards`
  }
});

export function Dialog({ children, ...props }: DialogProps) {
  return (
    <DialogPrimitive.Root {...props}>
      <StyledOverlay />
      {children}
    </DialogPrimitive.Root>
  );
}

const StyledContent = styled(DialogPrimitive.Content, panelStyles, {
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  minWidth: 200,
  maxWidth: "95vw",
  maxHeight: "85vh",
  padding: "$5",
  marginTop: "-5vh",
  willChange: "transform",
  border: "1px sold white",
  "&:focus": {
    outline: "none"
  },
  '&[data-state="open"]': {
    animation: `${fadeIn} 500ms forwards`
  },
  '&[data-state="closed"]': {
    animation: `${fadeOut} 500ms forwards`
  }
});

const StyledCloseButton = styled(DialogPrimitive.Close, {
  position: "absolute",
  top: "$5",
  right: "$5"
});

const StyledDialogTitle = styled(DialogPrimitive.Title, {
  fontSize: "$5",
  marginBottom: "$3",
  "@bp1": {
    fontSize: "$6"
  }
});

const StyledDialogDescription = styled(DialogPrimitive.Description, {
  fontSize: "$3",
  marginBottom: "$3"
});

type DialogContentPrimitiveProps = React.ComponentProps<typeof DialogPrimitive.Content>;
type DialogContentProps = DialogContentPrimitiveProps & { css?: CSS };

export const DialogContent = React.forwardRef<
  React.ElementRef<typeof StyledContent>,
  DialogContentProps
>(({ children, ...props }, forwardedRef) => (
  <StyledContent {...props} ref={forwardedRef}>
    {children}
    <StyledCloseButton asChild>
      <IconButton variant="ghost">
        <Svg color="white" as={IoClose} />
      </IconButton>
    </StyledCloseButton>
  </StyledContent>
));

DialogContent.displayName = "DialogContent";

export const DialogTrigger = DialogPrimitive.Trigger;
export const DialogClose = DialogPrimitive.Close;
export const DialogTitle = StyledDialogTitle;
export const DialogDescription = StyledDialogDescription;