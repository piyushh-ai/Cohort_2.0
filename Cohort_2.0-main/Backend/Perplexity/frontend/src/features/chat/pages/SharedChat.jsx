import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router";
import { getSharedChatApi } from "../services/chat.api";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const LogoIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="white">
    <path
      d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
      fill="none"
    />
  </svg>
);

const SharedChat = () => {
  const { shareSlug } = useParams();
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    getSharedChatApi({ shareSlug })
      .then(setData)
      .catch(() => setError("Chat not found or link has been revoked."));
  }, [shareSlug]);

  if (error)
    return (
      <div className="min-h-screen bg-[#080808] flex items-center justify-center px-4">
        <div className="text-center">
          <div className="w-10 h-10 rounded-xl bg-[#20b2aa] flex items-center justify-center mx-auto mb-4">
            <LogoIcon />
          </div>
          <p className="text-sm text-[#555]">{error}</p>
          <Link
            to="/login"
            className="mt-4 inline-block text-xs text-[#20b2aa] hover:text-[#2dd4bf]"
          >
            Go to app
          </Link>
        </div>
      </div>
    );

  if (!data)
    return (
      <div className="min-h-screen bg-[#080808] flex items-center justify-center">
        <svg
          className="animate-spin text-[#20b2aa]"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" opacity="0.2" />
          <path d="M21 12a9 9 0 00-9-9" strokeLinecap="round" />
        </svg>
      </div>
    );

  return (
    <div className="min-h-screen bg-[#080808] text-white">
      <div className="max-w-2xl mx-auto px-4 py-10">
        <div className="flex items-center gap-2.5 mb-8">
          <div className="w-7 h-7 rounded-xl bg-[#20b2aa] flex items-center justify-center">
            <LogoIcon />
          </div>
          <span className="text-sm font-semibold">Perplexity</span>
          <span className="text-[#2a2a2a] text-sm">·</span>
          <span className="text-xs text-[#444]">
            Shared by {data.chat.owner}
          </span>
        </div>

        <h1 className="text-lg font-semibold text-white mb-1">
          {data.chat.title}
        </h1>
        <p className="text-xs text-[#333] mb-8">
          {new Date(data.chat.createdAt).toLocaleDateString()}
        </p>

        <div className="space-y-5">
          {data.messages.map((msg, i) =>
            msg.role === "user" ? (
              <div key={i} className="flex justify-end">
                <div className="max-w-[75%] px-4 py-3 rounded-2xl rounded-tr-sm text-sm text-white/90 bg-[#1a2a2a] border border-[#20b2aa]/15">
                  {msg.content}
                </div>
              </div>
            ) : (
              <div key={i} className="flex gap-3">
                <div className="w-6 h-6 rounded-lg bg-[#20b2aa] flex items-center justify-center flex-shrink-0 mt-0.5">
                  <LogoIcon />
                </div>
                <div className="flex-1 text-sm text-[#bbb] leading-7">
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {msg.content}
                  </ReactMarkdown>
                </div>
              </div>
            ),
          )}
        </div>

        <div className="mt-12 pt-6 border-t border-[#111] text-center">
          <Link
            to="/"
            className="text-xs text-[#20b2aa] hover:text-[#2dd4bf] transition-colors"
          >
            Try Perplexity →
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SharedChat;
