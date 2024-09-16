"use client";

import { useState } from "react";
import { Button } from "@/components/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/sheet";
import { Globe, Menu } from "lucide-react";

const bibleBooks = [
  { abbr: "創", name: "創世記", english: "Genesis" },
  { abbr: "出", name: "出埃及記", english: "Exodus" },
  { abbr: "利", name: "利未記", english: "Leviticus" },
  { abbr: "民", name: "民數記", english: "Numbers" },
  { abbr: "申", name: "申命記", english: "Deuteronomy" },
  // ... (other books remain unchanged)
  { abbr: "瑪", name: "瑪拉基書", english: "Malachi" },
];

export default function BibleInterface() {
  const [language, setLanguage] = useState<"chinese" | "english" | "both">(
    "chinese"
  );
  const [currentBook, setCurrentBook] = useState(bibleBooks[0].name);

  const getContent = () => {
    switch (language) {
      case "chinese":
        return (
          <>
            <h2 className="text-2xl font-bold mb-4">第一章</h2>
            <p className="mb-1">
              <span className="text-red-500 mr-2">1</span>起初　神創造天地。
            </p>
            <p className="mb-1">
              <span className="text-red-500 mr-2">2</span>
              地是空虛混沌．淵面黑暗．　神的靈運行在水面上。
            </p>
            <p className="mb-1">
              <span className="text-red-500 mr-2">3</span>
              　神說、要有光、就有了光。
            </p>
            <p className="mb-1">
              <span className="text-red-500 mr-2">4</span>
              　神看光是好的、就把光暗分開了。
            </p>
            <p className="mb-1">
              <span className="text-red-500 mr-2">5</span>
              　神稱光為晝、稱暗為夜．有晚上、有早晨、這是頭一日。
            </p>
          </>
        );
      case "english":
        return (
          <>
            <h2 className="text-2xl font-bold mb-4">Chapter 1</h2>
            <p className="mb-1">
              <span className="text-red-500 mr-2">1</span>In the beginning, God
              created the heavens and the earth.
            </p>
            <p className="mb-1">
              <span className="text-red-500 mr-2">2</span>The earth was without
              form and void, and darkness was over the face of the deep. And the
              Spirit of God was hovering over the face of the waters.
            </p>
            <p className="mb-1">
              <span className="text-red-500 mr-2">3</span>And God said,
              &quot;Let there be light,&quot; and there was light.
            </p>
            <p className="mb-1">
              <span className="text-red-500 mr-2">4</span>And God saw that the
              light was good. And God separated the light from the darkness.
            </p>
            <p className="mb-1">
              <span className="text-red-500 mr-2">5</span>God called the light
              Day, and the darkness he called Night. And there was evening and
              there was morning, the first day.
            </p>
          </>
        );
      case "both":
        return (
          <>
            <h2 className="text-2xl font-bold mb-4">第一章 / Chapter 1</h2>
            <div className="mb-2">
              <p className="mb-0">
                <span className="text-red-500 mr-2">1</span>起初　神創造天地。
              </p>
              <p className="ml-6 mb-0 text-gray-600">
                In the beginning, God created the heavens and the earth.
              </p>
            </div>
            <div className="mb-2">
              <p className="mb-0">
                <span className="text-red-500 mr-2">2</span>
                地是空虛混沌．淵面黑暗．　神的靈運行在水面上。
              </p>
              <p className="ml-6 mb-0 text-gray-600">
                The earth was without form and void, and darkness was over the
                face of the deep. And the Spirit of God was hovering over the
                face of the waters.
              </p>
            </div>
            <div className="mb-2">
              <p className="mb-0">
                <span className="text-red-500 mr-2">3</span>
                　神說、要有光、就有了光。
              </p>
              <p className="ml-6 mb-0 text-gray-600">
                And God said, &quot;Let there be light,&quot; and there was
                light.
              </p>
            </div>
            <div className="mb-2">
              <p className="mb-0">
                <span className="text-red-500 mr-2">4</span>
                　神看光是好的、就把光暗分開了。
              </p>
              <p className="ml-6 mb-0 text-gray-600">
                And God saw that the light was good. And God separated the light
                from the darkness.
              </p>
            </div>
            <div className="mb-2">
              <p className="mb-0">
                <span className="text-red-500 mr-2">5</span>
                　神稱光為晝、稱暗為夜．有晚上、有早晨、這是頭一日。
              </p>
              <p className="ml-6 mb-0 text-gray-600">
                God called the light Day, and the darkness he called Night. And
                there was evening and there was morning, the first day.
              </p>
            </div>
          </>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-purple-600 text-white p-4 flex justify-between items-center">
        <div className="flex items-center">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="hover:bg-purple-700"
              >
                <Menu className="h-6 w-6" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <nav className="grid gap-4">
                {bibleBooks.map((book) => (
                  <Button
                    key={book.abbr}
                    variant="ghost"
                    className="justify-start hover:bg-purple-100 hover:text-purple-700"
                    onClick={() => setCurrentBook(book.name)}
                  >
                    <span className="w-8">{book.abbr}</span>
                    <span>
                      {language === "english" ? book.english : book.name}
                    </span>
                  </Button>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
          <Button variant="secondary" className="ml-2 hover:bg-purple-700">
            舊約全書
          </Button>
          <Button variant="secondary" className="ml-2 hover:bg-purple-700">
            新約全書
          </Button>
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
      <main className="container mx-auto mt-8 p-4 bg-white rounded-lg shadow">
        <h1 className="text-3xl font-bold mb-6 text-center">
          {language === "english"
            ? bibleBooks.find((book) => book.name === currentBook)?.english
            : currentBook}
        </h1>
        <div className="prose max-w-none">{getContent()}</div>
      </main>
    </div>
  );
}
