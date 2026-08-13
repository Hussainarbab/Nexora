"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export type SavedItem = {
  id: string;
  title: string;
  company?: string;
  location?: string;
  type?: string;
  workplace?: string;
  salary?: string;
  description?: string;
  category: "job" | "internship" | "scholarship";
};

type SaveButtonProps = {
  item: SavedItem;
};

export default function SaveButton({
  item,
}: SaveButtonProps) {
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(false);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    checkSaved();
  }, [item.id]);

  const checkSaved = async () => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        setChecking(false);
        return;
      }

      const { data, error } = await supabase
        .from("saved_items")
        .select("id")
        .eq("user_id", user.id)
        .eq("item_id", item.id)
        .eq("category", item.category)
        .maybeSingle();

      if (error) {
        console.error("Check saved error:", error);
      }

      setSaved(!!data);
    } catch (error) {
      console.error("Check saved error:", error);
    } finally {
      setChecking(false);
    }
  };

  const toggleSave = async () => {
    if (loading) return;

    setLoading(true);

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        alert("Please login first to save this item.");
        return;
      }

      if (saved) {
        const { error } = await supabase
          .from("saved_items")
          .delete()
          .eq("user_id", user.id)
          .eq("item_id", item.id)
          .eq("category", item.category);

        if (error) {
          console.error("Remove saved item error:", error);
          alert(error.message);
          return;
        }

        setSaved(false);
      } else {
        const { error } = await supabase
          .from("saved_items")
          .insert({
            user_id: user.id,
            item_id: item.id,
            category: item.category,
            title: item.title,
            company: item.company || "",
            location: item.location || "",
            type: item.type || "",
            workplace: item.workplace || "",
            salary: item.salary || "",
            description: item.description || "",
          });

        if (error) {
          console.error("Save item error:", error);
          alert(error.message);
          return;
        }

        setSaved(true);
      }
    } catch (error) {
      console.error("Save button error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      type="button"
      onClick={toggleSave}
      disabled={loading || checking}
      aria-label={
        saved ? "Remove from saved" : "Save item"
      }
      title={
        saved ? "Remove from saved" : "Save this item"
      }
      className={`flex h-10 w-10 items-center justify-center rounded-xl border transition ${
        saved
          ? "border-red-200 bg-red-50 text-red-600 hover:bg-red-100"
          : "border-slate-200 bg-white text-slate-500 hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600"
      } ${
        loading || checking
          ? "cursor-not-allowed opacity-60"
          : ""
      }`}
    >
      <span className="text-lg">
        {saved ? "❤️" : "♡"}
      </span>
    </button>
  );
}