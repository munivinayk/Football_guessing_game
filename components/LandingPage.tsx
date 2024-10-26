'use client';

import { useState } from 'react';
import { Users, User, Gamepad2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

export default function LandingPage() {
  const [mode, setMode] = useState<'select' | 'single' | 'two'>('select');
  const [player1, setPlayer1] = useState('');
  const [player2, setPlayer2] = useState('');
  const router = useRouter();

  const handleStart = () => {
    if (mode === 'single') {
      router.push('/game?mode=single&player1=' + encodeURIComponent(player1));
    } else {
      const winner = Math.random() < 0.5 ? player1 : player2;
      router.push(
        '/game?mode=two' +
        '&player1=' + encodeURIComponent(player1) +
        '&player2=' + encodeURIComponent(player2) +
        '&starter=' + encodeURIComponent(winner)
      );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-800 to-green-600 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl p-8 w-full max-w-md shadow-xl"
      >
        <h1 className="text-3xl font-bold text-center mb-8 text-green-800">
          Guess The Footballer
        </h1>

        {mode === 'select' && (
          <div className="space-y-4">
            <Button
              variant="outline"
              className="w-full py-8 text-lg"
              onClick={() => setMode('single')}
            >
              <User className="mr-2 h-6 w-6" />
              Single Player
            </Button>
            <Button
              variant="outline"
              className="w-full py-8 text-lg"
              onClick={() => setMode('two')}
            >
              <Users className="mr-2 h-6 w-6" />
              Two Players
            </Button>
          </div>
        )}

        {(mode === 'single' || mode === 'two') && (
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-1 block">
                Player 1 Name
              </label>
              <Input
                value={player1}
                onChange={(e) => setPlayer1(e.target.value)}
                placeholder="Enter name"
                className="w-full"
              />
            </div>

            {mode === 'two' && (
              <div>
                <label className="text-sm font-medium mb-1 block">
                  Player 2 Name
                </label>
                <Input
                  value={player2}
                  onChange={(e) => setPlayer2(e.target.value)}
                  placeholder="Enter name"
                  className="w-full"
                />
              </div>
            )}

            <Button
              className="w-full py-6 text-lg"
              onClick={handleStart}
              disabled={!player1 || (mode === 'two' && !player2)}
            >
              <Gamepad2 className="mr-2 h-6 w-6" />
              Start Game
            </Button>

            <Button
              variant="ghost"
              className="w-full"
              onClick={() => setMode('select')}
            >
              Back
            </Button>
          </div>
        )}
      </motion.div>
    </div>
  );
}