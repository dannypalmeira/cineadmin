import readUserSession from '@/lib/actions';
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { lerFilme } from './filmes/actions';

export default async function Home() {
    const {data:todos} = await lerFilme();
  
    return (
      <div className="mb-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-4 lg:text-left">
          
          {todos?.map((todo, index) => {
  
            return (
              <div key={index} className="flex gap-2">
                <div className="group rounded-lg border px-5 py-4 border-gray-300 bg-gray-100">
                <img src={todo.imagem} />
                <h2
                  className={`mb-3 text-2xl font-semibold ${todo.completed ? 'line-through' : ''}`}> 
                  {todo.titulo}								
                </h2>
                <p><strong>Genero:</strong> {todo.genero}</p>
                <p><strong>Ano:</strong> {todo.ano}</p>
                <p><strong>Discrição:</strong> {todo.descricao}</p>
                </div>
                
                
              </div>
            );
          })}
        </div>
    );
  }
  