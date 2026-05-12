-- ========================================================
-- CricWorld Master Database Schema
-- Run this in your Supabase SQL Editor
-- ========================================================

-- 1. Matches Table (Live & Scheduled)
CREATE TABLE IF NOT EXISTS matches (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    external_id TEXT UNIQUE, -- ID from source (e.g. ESPN id)
    title TEXT NOT NULL,
    team1 TEXT NOT NULL,
    team2 TEXT NOT NULL,
    team1_short TEXT,
    team2_short TEXT,
    format TEXT, -- T20, ODI, TEST
    status TEXT DEFAULT 'upcoming', -- live, upcoming, finished
    venue TEXT,
    match_date TIMESTAMPTZ,
    score_t1 TEXT,
    overs_t1 TEXT,
    score_t2 TEXT,
    overs_t2 TEXT,
    summary TEXT,
    toss TEXT,
    source TEXT, -- ESPN, ICC, Cricbuzz
    source_url TEXT,
    is_live BOOLEAN DEFAULT false,
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- 2. Commentary / Ball-by-Ball Table
CREATE TABLE IF NOT EXISTS commentary (
    id BIGSERIAL PRIMARY KEY,
    match_id UUID REFERENCES matches(id) ON DELETE CASCADE,
    over_no DECIMAL(4,1), -- e.g. 18.3
    ball_no INT,
    batsman TEXT,
    bowler TEXT,
    runs INT,
    is_wicket BOOLEAN DEFAULT false,
    event TEXT, -- four, six, wicket, dot
    text TEXT, -- Commentary text
    source TEXT,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 3. Players Table
CREATE TABLE IF NOT EXISTS players (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    external_id TEXT UNIQUE,
    name TEXT NOT NULL,
    full_name TEXT,
    team TEXT,
    role TEXT,
    batting_style TEXT,
    bowling_style TEXT,
    born TEXT,
    bio TEXT,
    image_url TEXT,
    stats JSONB, -- Batting/Bowling averages, etc.
    rankings JSONB,
    source_url TEXT,
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- 4. Points Table
CREATE TABLE IF NOT EXISTS points_table (
    id SERIAL PRIMARY KEY,
    series_name TEXT NOT NULL,
    team_name TEXT NOT NULL,
    team_short TEXT,
    played INT DEFAULT 0,
    won INT DEFAULT 0,
    lost INT DEFAULT 0,
    tied INT DEFAULT 0,
    no_result INT DEFAULT 0,
    points INT DEFAULT 0,
    nrr DECIMAL(6,3) DEFAULT 0.000,
    source TEXT,
    updated_at TIMESTAMPTZ DEFAULT now(),
    UNIQUE(series_name, team_name)
);

-- Enable Realtime for live updates
ALTER PUBLICATION supabase_realtime ADD TABLE matches;
ALTER PUBLICATION supabase_realtime ADD TABLE commentary;
