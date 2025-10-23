"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const ViewDescriptions = ({ description, isOpen, setIsOpen }) => {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="md:max-w-lg xl:max-w-xl">
        <DialogHeader>
          <DialogTitle>Bike Description</DialogTitle>
        </DialogHeader>
        <DialogDescription className="">
          {description}
        </DialogDescription>
        
      </DialogContent>
    </Dialog>
  );
};

export default ViewDescriptions;
