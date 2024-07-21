% Define las preguntas y sus áreas correspondientes
pregunta(linguistica, "Leer libros, revistas, novelas, ensayos, etc.").
pregunta(linguistica, "Escribir textos").
pregunta(linguistica, "Analizar e identificar las ideas principales de un texto").
pregunta(linguistica, "Entender un texto escrito").

pregunta(logica_matematica, "Hacer cuentas matemáticas").
pregunta(logica_matematica, "Usar estadísticas").
pregunta(logica_matematica, "Solucionar problemas lógicos").
pregunta(logica_matematica, "Pensar y descomponer lógicamente un problema").

pregunta(espacial, "Dibujar de forma precisa").
pregunta(espacial, "Armar maquetas o modelos").
pregunta(espacial, "Dibujar planos").
pregunta(espacial, "Diseñar objetos").

pregunta(musica, "Tocar un instrumento musical").
pregunta(musica, "Escuchar música").
pregunta(musica, "Cantar").
pregunta(musica, "Escuchar y reconocer distintos instrumentos musicales").

pregunta(interpersonal, "Coordinar grupos").
pregunta(interpersonal, "Exponer un tema o idea en público").
pregunta(interpersonal, "Defender los derechos de otras personas").
pregunta(interpersonal, "Iniciar y mantener conversaciones con otras personas").

pregunta(kinestesico_corporal, "Hacer ejercicio físico").
pregunta(kinestesico_corporal, "Hacer movimientos que requieren equilibrio").
pregunta(kinestesico_corporal, "Manejar objetos de forma precisa").
pregunta(kinestesico_corporal, "Manipular objetos con coordinación").

pregunta(intrapersonal, "Reconocer estados emocionales propios").
pregunta(intrapersonal, "Tener Autocontrol Emocional").
pregunta(intrapersonal, "Contener emocionalmente a otras personas").
pregunta(intrapersonal, "Analizar tus propios pensamientos y acciones").

pregunta(naturalista, "Estar en contacto con la naturaleza").
pregunta(naturalista, "Analizar materia orgánica").
pregunta(naturalista, "Estudiar temas vinculados a la biología y el cuerpo humano").
pregunta(naturalista, "Analizar fenómenos naturales").

% Función para sumar las puntuaciones por área
sumar_puntuaciones([], [], 0).
sumar_puntuaciones([Respuesta|Respuestas], [Pregunta|Preguntas], Suma) :-
    pregunta(Area, Pregunta),
    sumar_puntuaciones(Respuestas, Preguntas, SumaResto),
    Suma is SumaResto + Respuesta.

% Función para calcular la probabilidad de cada área
calcular_probabilidades([], _, _, []).
calcular_probabilidades([Area|Areas], Preguntas, Respuestas, [Area-Probabilidad|Probabilidades]) :-
    findall(Pregunta, pregunta(Area, Pregunta), PreguntasArea),
    maplist(pregunta_respuesta(Respuestas, Preguntas), PreguntasArea, RespuestasArea),
    length(PreguntasArea, CantidadPreguntasArea),
    length(Preguntas, TotalPreguntas),
    sum_list(Respuestas, SumaTotal),
    sum_list(RespuestasArea, SumaArea),
    Probabilidad is (SumaArea / SumaTotal) * 100,
    calcular_probabilidades(Areas, Preguntas, Respuestas, Probabilidades).

pregunta_respuesta(Respuestas, Preguntas, Pregunta, Respuesta) :-
    nth1(Index, Preguntas, Pregunta),
    nth1(Index, Respuestas, Respuesta).

% Función principal para calcular probabilidades basadas en respuestas dadas
calcular_probabilidades_respuestas(Respuestas, Probabilidades) :-
    findall(Pregunta, pregunta(_, Pregunta), Preguntas),
    length(Preguntas, Len),
    length(Respuestas, Len),
    forall(member(R, Respuestas), (R >= 0, R =< 10)),
    findall(Area, pregunta(Area, _), Areas),
    list_to_set(Areas, AreasSet),
    calcular_probabilidades(AreasSet, Preguntas, Respuestas, Probabilidades).

% run :-
%     Respuestas = [ 
%         1, 1, 1, 1, 
%         10, 10, 10, 10,
%         1, 1, 1, 1,
%         1, 1, 1, 1,
%         1, 1, 1, 1,
%         1, 1, 1, 1,
%         1, 1, 1, 1,
%         1, 1, 1, 1],
%     calcular_probabilidades_respuestas(Respuestas, Probabilidades),
%     write(Probabilidades), nl.

% :- initialization run.
