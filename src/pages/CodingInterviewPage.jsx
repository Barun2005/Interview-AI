import React, { useState } from 'react';
import { executeCodeSnippet } from '../services/aiEngine';

export const CodingInterviewPage = () => {
  const [selectedLanguage, setSelectedLanguage] = useState('javascript');

  const defaultTemplates = {
    javascript: `/**
 * Problem: Longest Substring Without Repeating Characters
 * Given a string s, find the length of the longest substring without repeating characters.
 */
function lengthOfLongestSubstring(s) {
    let charMap = new Map();
    let left = 0;
    let maxLength = 0;

    for (let right = 0; right < s.length; right++) {
        if (charMap.has(s[right]) && charMap.get(s[right]) >= left) {
            left = charMap.get(s[right]) + 1;
        }
        charMap.set(s[right], right);
        maxLength = Math.max(maxLength, right - left + 1);
    }

    return maxLength;
}

// Test call
console.log(lengthOfLongestSubstring("abcabcbb")); // Output: 3`,
    python: `class Solution:
    def lengthOfLongestSubstring(self, s: str) -> int:
        char_map = {}
        left = 0
        max_length = 0

        for right in range(len(s)):
            if s[right] in char_map and char_map[s[right]] >= left:
                left = char_map[s[right]] + 1
            char_map[s[right]] = right
            max_length = max(max_length, right - left + 1)

        return max_length`,
    java: `import java.util.*;

public class Solution {
    public int lengthOfLongestSubstring(String s) {
        Map<Character, Integer> map = new HashMap<>();
        int left = 0, maxLength = 0;
        
        for (int right = 0; right < s.length(); right++) {
            char c = s.charAt(right);
            if (map.containsKey(c) && map.get(c) >= left) {
                left = map.get(c) + 1;
            }
            map.put(c, right);
            maxLength = Math.max(maxLength, right - left + 1);
        }
        return maxLength;
    }
}`,
    cpp: `#include <iostream>
#include <unordered_map>
#include <string>
using namespace std;

int lengthOfLongestSubstring(string s) {
    unordered_map<char, int> map;
    int left = 0, maxLength = 0;
    for (int right = 0; right < s.length(); right++) {
        if (map.count(s[right]) && map[s[right]] >= left) {
            left = map[s[right]] + 1;
        }
        map[s[right]] = right;
        maxLength = max(maxLength, right - left + 1);
    }
    return maxLength;
}`
  };

  const [code, setCode] = useState(defaultTemplates.javascript);
  const [terminalOutput, setTerminalOutput] = useState('');
  const [executionResult, setExecutionResult] = useState(null);
  const [isExecuting, setIsExecuting] = useState(false);

  const handleLanguageChange = (lang) => {
    setSelectedLanguage(lang);
    setCode(defaultTemplates[lang] || '');
  };

  const handleRunCode = () => {
    setIsExecuting(true);
    setTimeout(() => {
      const res = executeCodeSnippet(code, selectedLanguage);
      setTerminalOutput(res.output);
      setExecutionResult(res);
      setIsExecuting(false);
    }, 400);
  };

  return (
    <div className="max-w-[1280px] mx-auto px-6 py-6 space-y-6 pb-24">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-300 dark:border-slate-800 pb-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-heading">
            AI Coding Interview Lab 💻
          </h1>
          <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 font-medium">
            Write code, run test cases, and analyze asymptotic Time/Space complexity in real time.
          </p>
        </div>

        {/* Language Selector */}
        <div className="flex items-center gap-2">
          {['javascript', 'python', 'java', 'cpp'].map((lang) => (
            <button
              key={lang}
              onClick={() => handleLanguageChange(lang)}
              className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold uppercase transition ${
                selectedLanguage === lang
                  ? 'bg-teal-600 text-white shadow-md'
                  : 'bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200 hover:bg-slate-300 border border-slate-300 dark:border-slate-700'
              }`}
            >
              {lang}
            </button>
          ))}
        </div>
      </div>

      {/* Main Coding Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column (4 cols): Problem Statement */}
        <div className="lg:col-span-4 bg-white dark:bg-[#111827] rounded-2xl p-5 border border-slate-300 dark:border-slate-800 space-y-4 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono uppercase px-2.5 py-0.5 rounded bg-amber-100 dark:bg-amber-950/80 text-amber-800 dark:text-amber-300 font-extrabold border border-amber-500/30">
              Medium • Algorithms
            </span>
            <span className="text-xs text-slate-600 dark:text-slate-400 font-mono font-bold">Time Limit: 2.0s</span>
          </div>

          <h3 className="font-extrabold text-slate-900 dark:text-white text-lg font-heading">
            Longest Substring Without Repeating Characters
          </h3>

          <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
            Given a string <code className="text-teal-700 dark:text-teal-400 font-mono font-bold bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded">s</code>, find the length of the longest substring without repeating characters.
          </p>

          <div className="space-y-3 pt-2">
            <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-300 dark:border-slate-800 space-y-1 text-xs font-mono">
              <span className="text-slate-600 dark:text-slate-400 text-[10px] uppercase font-bold">Example 1:</span>
              <p className="text-slate-900 dark:text-white font-bold">Input: s = "abcabcbb"</p>
              <p className="text-teal-700 dark:text-teal-400 font-bold">Output: 3</p>
              <p className="text-slate-600 dark:text-slate-400 text-[10px]">Explanation: The answer is "abc", with length 3.</p>
            </div>

            <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-300 dark:border-slate-800 space-y-1 text-xs font-mono">
              <span className="text-slate-600 dark:text-slate-400 text-[10px] uppercase font-bold">Example 2:</span>
              <p className="text-slate-900 dark:text-white font-bold">Input: s = "bbbbb"</p>
              <p className="text-teal-700 dark:text-teal-400 font-bold">Output: 1</p>
            </div>
          </div>
        </div>

        {/* Right Column (8 cols): Editor & Output Terminal */}
        <div className="lg:col-span-8 space-y-4">
          
          <div className="bg-white dark:bg-[#111827] rounded-2xl p-4 border border-slate-300 dark:border-slate-800 space-y-3 shadow-sm">
            <div className="flex items-center justify-between text-xs text-slate-700 dark:text-slate-300 border-b border-slate-200 dark:border-slate-800 pb-2">
              <span className="font-mono font-bold">
                solution.{selectedLanguage === 'javascript' ? 'js' : selectedLanguage === 'python' ? 'py' : selectedLanguage === 'java' ? 'java' : 'cpp'}
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCode(defaultTemplates[selectedLanguage])}
                  className="px-3 py-1 rounded-lg bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 text-slate-800 dark:text-slate-200 text-xs font-mono font-bold"
                >
                  Reset
                </button>
                <button
                  onClick={handleRunCode}
                  disabled={isExecuting}
                  className="px-4 py-1.5 rounded-lg text-xs font-bold text-white bg-teal-600 hover:bg-teal-700 flex items-center gap-1.5 shadow"
                >
                  <span className="material-symbols-outlined text-sm">play_arrow</span>
                  {isExecuting ? 'Compiling...' : 'Run & Submit'}
                </button>
              </div>
            </div>

            <textarea
              rows={14}
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full bg-slate-950 text-teal-300 font-mono text-xs sm:text-sm p-4 rounded-xl border border-slate-800 focus:outline-none focus:border-teal-500 leading-relaxed shadow-inner"
              spellCheck="false"
            />
          </div>

          {/* Terminal Output */}
          {terminalOutput && (
            <div className="bg-white dark:bg-[#111827] rounded-2xl p-5 border border-slate-300 dark:border-slate-800 space-y-3 shadow-sm">
              <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase font-mono">
                Execution Terminal & Asymptotic Complexity Review
              </h4>
              <pre className="p-4 rounded-xl bg-slate-950 text-emerald-400 font-mono text-xs overflow-x-auto leading-relaxed border border-slate-800">
                {terminalOutput}
              </pre>
            </div>
          )}

        </div>

      </div>

    </div>
  );
};
