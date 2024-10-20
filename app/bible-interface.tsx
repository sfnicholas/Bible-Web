"use client";

import React, { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/sheet";
import { Globe, Book } from "lucide-react";

interface BibleBook {
  id: string;
  name: string;
  abv: string;
}

interface BibleData {
  cuv: BibleBook[];
  esv: BibleBook[];
}

export default function ClientBibleInterface() {
  const [language, setLanguage] = useState<"chinese" | "english" | "both">(() =>
    typeof window !== "undefined"
      ? (localStorage.getItem("language") as "chinese" | "english" | "both") ||
        "chinese"
      : "chinese"
  );
  const [currentBook, setCurrentBook] = useState<BibleBook | null>(() =>
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("currentBook") || "null")
      : null
  );
  const [bibleData, setBibleData] = useState<BibleData | null>(null);
  const [currentChapter, setCurrentChapter] = useState(() =>
    typeof window !== "undefined"
      ? parseInt(localStorage.getItem("currentChapter") || "1", 10)
      : 1
  );
  const chaptersPerGroup = 15;
  const [bibleContent, setBibleContent] = useState<string[][]>([]);
  const [isBookListOpen, setIsBookListOpen] = useState(false);
  const [chapterCount, setChapterCount] = useState(0);

  useEffect(() => {
    async function fetchBibleData() {
      try {
        const response = await fetch("/api/book-list");
        if (!response.ok) {
          throw new Error("Failed to fetch Bible book list");
        }
        const data = await response.json();
        console.log("Bible Book List:", data);
        setBibleData(data);
        if (!currentBook && data.cuv.length > 0) {
          setCurrentBook(data.cuv[0]);
        }
      } catch (error) {
        console.error("Error fetching Bible book list:", error);
      }
    }
    fetchBibleData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    async function fetchBibleContent() {
      if (currentBook) {
        try {
          console.log("Fetching content for book:", currentBook);
          const cuvResponse = await fetch(
            `/api/bible?version=cuv&bookId=${currentBook.id}`
          );
          const esvResponse = await fetch(
            `/api/bible?version=esv&bookId=${currentBook.id}`
          );

          if (!cuvResponse.ok || !esvResponse.ok) {
            throw new Error("Failed to fetch Bible content");
          }

          const cuvData = await cuvResponse.json();
          const esvData = await esvResponse.json();

          console.log("CUV Data:", cuvData);
          console.log("ESV Data:", esvData);

          setBibleContent([
            cuvData.chapters[currentChapter - 1],
            esvData.chapters[currentChapter - 1],
          ]);
          setChapterCount(cuvData.chapters.length);
          window.scrollTo(0, 0);
        } catch (error) {
          console.error("Error fetching Bible content:", error);
        }
      }
    }
    fetchBibleContent();
  }, [currentBook, currentChapter]);

  useEffect(() => {
    if (currentBook) {
      localStorage.setItem("currentBook", JSON.stringify(currentBook));
    }
  }, [currentBook]);

  useEffect(() => {
    localStorage.setItem("currentChapter", currentChapter.toString());
  }, [currentChapter]);

  useEffect(() => {
    localStorage.setItem("language", language);
  }, [language]);

  const goToPreviousChapter = useCallback(() => {
    if (!currentBook || !bibleData) return;
    const currentBookIndex = bibleData.cuv.findIndex(
      (book) => book.id === currentBook.id
    );
    if (currentChapter > 1) {
      setCurrentChapter(currentChapter - 1);
    } else if (currentBookIndex > 0) {
      const previousBook = bibleData.cuv[currentBookIndex - 1];
      setCurrentBook(previousBook);
      // Fetch the chapter count for the previous book
      fetch(`/api/bible?version=cuv&bookId=${previousBook.id}`)
        .then((response) => response.json())
        .then((data) => {
          setChapterCount(data.chapters.length);
          setCurrentChapter(data.chapters.length);
        })
        .catch((error) =>
          console.error("Error fetching previous book data:", error)
        );
    }
  }, [currentBook, bibleData, currentChapter]);

  const goToNextChapter = useCallback(() => {
    if (!currentBook || !bibleData) return;
    const currentBookIndex = bibleData.cuv.findIndex(
      (book) => book.id === currentBook.id
    );
    if (currentChapter < chapterCount) {
      setCurrentChapter(currentChapter + 1);
    } else if (currentBookIndex < bibleData.cuv.length - 1) {
      const nextBook = bibleData.cuv[currentBookIndex + 1];
      setCurrentBook(nextBook);
      setCurrentChapter(1);
    }
  }, [currentBook, bibleData, currentChapter, chapterCount]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") {
        goToPreviousChapter();
      } else if (event.key === "ArrowRight") {
        goToNextChapter();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [goToPreviousChapter, goToNextChapter]);

  useEffect(() => {
    let touchStartX = 0;
    let touchStartY = 0;
    let touchEndX = 0;
    let touchEndY = 0;
    const minSwipeDistance = 50; // Minimum horizontal swipe distance to trigger page change
    const maxVerticalSwipeDistance = 30; // Max allowed vertical swipe distance to recognize it as horizontal swipe

    const handleTouchStart = (event: TouchEvent) => {
      touchStartX = event.touches[0].clientX;
      touchStartY = event.touches[0].clientY;
    };

    const handleTouchEnd = (event: TouchEvent) => {
      touchEndX = event.changedTouches[0].clientX;
      touchEndY = event.changedTouches[0].clientY;

      const deltaX = touchEndX - touchStartX;
      const deltaY = touchEndY - touchStartY;

      // Check if the swipe is primarily horizontal and exceeds the minimum distance
      if (
        Math.abs(deltaX) > minSwipeDistance && // Horizontal movement should exceed the minimum distance
        Math.abs(deltaY) < maxVerticalSwipeDistance // Vertical movement should stay below the threshold
      ) {
        if (deltaX > 0) {
          // Rightward swipe
          goToPreviousChapter();
        } else if (deltaX < 0) {
          // Leftward swipe
          goToNextChapter();
        }
      }
    };

    window.addEventListener("touchstart", handleTouchStart);
    window.addEventListener("touchend", handleTouchEnd);

    return () => {
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [goToPreviousChapter, goToNextChapter]);

  const changeBook = (book: BibleBook) => {
    setCurrentBook(book);
    setCurrentChapter(1);
  };

  const getBookName = (book: BibleBook | null) => {
    if (!book || !bibleData) return "";
    const esvBook = bibleData.esv.find((b) => b.id === book.id);
    return language === "english" ? esvBook?.name || book.name : book.name;
  };

  const getBookAbv = (book: BibleBook | null) => {
    if (!book || !bibleData) return "";
    const esvBook = bibleData.esv.find((b) => b.id === book.id);
    return language === "english" ? esvBook?.abv || book.abv : book.abv;
  };

  const getChapterButtons = () => {
    if (!currentBook) return null;

    const buttons = [];
    const totalChapters = chapterCount;
    const currentGroup = Math.ceil(currentChapter / chaptersPerGroup);
    const totalGroups = Math.ceil(totalChapters / chaptersPerGroup);

    // Add book name
    buttons.push(
      <Button
        key="book-name"
        variant="link"
        className="font-bold text-blue-800 mr-2"
      >
        {getBookName(currentBook)}
      </Button>
    );

    buttons.push(
      <span key="separator-start" className="text-gray-400 mx-1">
        |
      </span>
    );

    // Add grouped buttons
    for (let i = 1; i <= totalGroups; i++) {
      const start = (i - 1) * chaptersPerGroup + 1;
      const end = Math.min(i * chaptersPerGroup, totalChapters);

      if (i === currentGroup) {
        // Show individual buttons for the current group
        for (let j = start; j <= end; j++) {
          buttons.push(
            <Button
              key={j}
              variant={j === currentChapter ? "secondary" : "ghost"}
              onClick={() => setCurrentChapter(j)}
              className="text-blue-800 px-2 py-1 mx-0.5"
            >
              {j}
            </Button>
          );
        }
      } else {
        // Show grouped button for other groups
        buttons.push(
          <Button
            key={`group-${i}`}
            variant="link"
            onClick={() => setCurrentChapter(start)}
            className="text-blue-800 px-2 py-1 mx-0.5"
          >
            {start}-{end}
          </Button>
        );
      }

      if (i < totalGroups) {
        buttons.push(
          <span key={`separator-${i}`} className="text-gray-400 mx-1">
            |
          </span>
        );
      }
    }

    return (
      <div className="bg-gray-100 p-2 flex justify-center items-center flex-wrap">
        {buttons}
      </div>
    );
  };

  const getContent = () => {
    if (!bibleContent[0] || !bibleContent[1] || !currentBook || !bibleData)
      return null;

    const [cuvContent, esvContent] = bibleContent;

    const processChineseVerse = (verse: string, index: number) => {
      if (verse.length === 1 && verse.toLowerCase() === "a") {
        return (
          <p key={index} className="mb-1 text-gray-400 italic">
            <span className="text-red-600 mr-2">{index + 1}</span>
            [跳過]
          </p>
        );
      }
      return (
        <p key={index} className="mb-1">
          <span className="text-red-600 mr-2">{index + 1}</span>
          {verse}
        </p>
      );
    };

    switch (language) {
      case "chinese":
        return (
          <>
            <h2 className="text-2xl mb-4 text-black">
              {getBookName(currentBook)} 第{currentChapter}章
            </h2>
            {cuvContent.map((verse, index) =>
              processChineseVerse(verse, index)
            )}
          </>
        );
      case "english":
        return (
          <>
            <h2 className="text-2xl mb-4 text-black">
              {getBookName(currentBook)} Chapter {currentChapter}
            </h2>
            {esvContent.map((verse, index) => (
              <p key={index} className="mb-1">
                <span className="text-red-600 mr-2">{index + 1}</span>
                {verse}
              </p>
            ))}
          </>
        );
      case "both":
        const chineseName = currentBook.name;
        const englishName =
          bibleData.esv.find((b) => b.id === currentBook.id)?.name ||
          currentBook.name;
        return (
          <>
            <h2 className="text-2xl mb-4 text-black">
              {chineseName} 第{currentChapter}章 / {englishName} Chapter{" "}
              {currentChapter}
            </h2>
            {cuvContent.map((verse, index) => (
              <div key={index} className="mb-1.5 text-black">
                {processChineseVerse(verse, index)}
                <p className="mb-2 text-gray-600">
                  <span className="text-red-600 invisible mr-2">
                    {index + 1}
                  </span>
                  {esvContent[index]}
                </p>
              </div>
            ))}
          </>
        );
    }
  };

  const getBookList = () => {
    if (!bibleData) return null;

    const oldTestament = bibleData.cuv.slice(0, 39);
    const newTestament = bibleData.cuv.slice(39);

    return (
      <div className="grid grid-cols-2 gap-4">
        <div>
          <h3 className="font-bold mb-2">舊約 / Old Testament</h3>
          <div className="grid grid-cols-5 gap-2">
            {oldTestament.map((book) => (
              <Button
                key={book.id}
                variant="ghost"
                className="p-1 h-auto text-xs hover:bg-purple-100 hover:text-purple-700"
                onClick={() => {
                  changeBook(book);
                  setIsBookListOpen(false);
                }}
              >
                {getBookAbv(book)}
              </Button>
            ))}
          </div>
        </div>
        <div>
          <h3 className="font-bold mb-2">新約 / New Testament</h3>
          <div className="grid grid-cols-5 gap-2">
            {newTestament.map((book) => (
              <Button
                key={book.id}
                variant="ghost"
                className="p-1 h-auto text-xs hover:bg-purple-100 hover:text-purple-700"
                onClick={() => {
                  changeBook(book);
                  setIsBookListOpen(false);
                }}
              >
                {getBookAbv(book)}
              </Button>
            ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <header className="bg-purple-600 text-white p-4 flex justify-between items-center">
        <div className="flex items-center">
          <Sheet open={isBookListOpen} onOpenChange={setIsBookListOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" className="hover:bg-purple-700">
                <Book className="mr-2 h-4 w-4" />
                聖經目錄 / Bible Book List
              </Button>
            </SheetTrigger>
            <SheetContent
              side="left"
              className="w-[80vw] sm:w-[60vw] max-w-[800px]"
            >
              <SheetTitle className="sr-only">
                聖經目錄 / Bible Book List
              </SheetTitle>
              {getBookList()}
            </SheetContent>
          </Sheet>
        </div>
        <div className="flex items-center">
          <div className="flex space-x-2">
            <Button
              variant={language === "chinese" ? "secondary" : "ghost"}
              onClick={() => setLanguage("chinese")}
              className="hover:bg-purple-700"
            >
              <Globe className="mr-2 h-4 w-4" />中
            </Button>
            <Button
              variant={language === "english" ? "secondary" : "ghost"}
              onClick={() => setLanguage("english")}
              className="hover:bg-purple-700"
            >
              <Globe className="mr-2 h-4 w-4" />
              En
            </Button>
            <Button
              variant={language === "both" ? "secondary" : "ghost"}
              onClick={() => setLanguage("both")}
              className="hover:bg-purple-700"
            >
              <Globe className="mr-2 h-4 w-4" />
              中/En
            </Button>
          </div>
        </div>
      </header>
      {getChapterButtons()}
      <main className="container mx-auto mt-4 p-4 bg-gray-100 rounded-lg shadow flex-grow">
        <div className="prose max-w-none">{getContent()}</div>
      </main>
    </div>
  );
}
