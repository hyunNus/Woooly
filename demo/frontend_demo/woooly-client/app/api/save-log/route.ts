import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    // 저장할 로그 데이터 구성
    const logEntry = {
      timestamp: new Date().toISOString(),
      final_phase: data.phase,
      messages: data.messages,
      meta: {
        source: "demo_booth",
        model: "Woooly-70B-v1"
      }
    };

    // 프로젝트 루트 경로에 'eil_dataset.jsonl' 파일로 저장
    // process.cwd()는 프로젝트의 최상위 폴더를 가리킵니다.
    const filePath = path.join(process.cwd(), 'eil_dataset.jsonl');
    
    // Append 모드로 한 줄씩 추가 (없으면 생성, 있으면 이어쓰기)
    fs.appendFileSync(filePath, JSON.stringify(logEntry) + '\n', 'utf8');

    return NextResponse.json({ success: true, message: "Log saved successfully" });
    
  } catch (error) {
    console.error("Save Error:", error);
    return NextResponse.json({ success: false, error: "Failed to save log" }, { status: 500 });
  }
}