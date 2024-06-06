const ageOptions = Array.from({ length: 86 }, (_, i) => i + 14);

const steps = [
    {
        question: '¿Qué edad tienes?',
        answerType: 'select',
        answerKey: 'age',
        options: ageOptions.map(age => ({ value: age, label: age })),
        idea: [
            'Con la edad, el metabolismo tiende a desacelerar, lo que significa que necesitamos consumir menos calorías y priorizar alimentos nutritivos para mantener un peso saludable.',
            'A medida que envejecemos, la absorción de ciertos nutrientes, como el calcio y la vitamina D, puede volverse menos eficiente, lo que hace importante incluir fuentes ricas en estos nutrientes en nuestra dieta.',
            'La pérdida de masa muscular es común con la edad, pero el ejercicio de resistencia regular puede ayudar a contrarrestar este efecto y mantener la fuerza y la funcionalidad.',
            'El envejecimiento puede aumentar el riesgo de deshidratación, por lo que es crucial mantenerse hidratado y consumir suficientes líquidos a lo largo del día.',
            'La flexibilidad y la movilidad pueden disminuir con la edad, pero actividades como el yoga y el estiramiento regular pueden ayudar a mantener la flexibilidad y prevenir lesiones.'
        ]
    },
    {
        question: '¿Cuál es tu género?',
        answerType: 'select',
        answerKey: 'gender',
        options: [
            { value: 'male', label: 'Masculino' },
            { value: 'female', label: 'Femenino' },
            { value: 'no-binary', label: 'No binario' },
            { value: 'transfemenine', label: 'Transfemenino' },
            { value: 'transmasculine', label: 'Transmasculino' },
            { value: 'genderqueer', label: 'Genderqueer' },
            { value: 'idk', label: 'No lo sé' },
            { value: 'pnts', label: 'Prefiero no decirlo' }
        ],
        idea: [
            'El género juega un rol muy importante al momento de crear tu identidad personal, siéntete libre de elegir la opción que mejor te represente.'
        ]
    },
    {
        question: '¿Cuál es tu fecha de nacimiento?',
        answerType: 'date',
        answerKey: 'birthday',
        idea: [
            'El objetivo es que tengas tu perfil lo más personalizado y específico posible, queremos que sientas esa importancia que le damos a tu bienestar. Además, nos ayuda a comprobar tu edad.'
        ]
    },
    {
        question: '¿Cuál es tu sexo biológico?',
        answerType: 'select',
        answerKey: 'biologicalSex',
        options: [
            { value: 'men', label: 'Hombre' },
            { value: 'women', label: 'Mujer' }
        ],
        idea: [
            'Las mujeres tienden a experimentar cambios hormonales más significativos durante la menopausia, lo que puede influir en la distribución de grasa corporal y el metabolismo, requiriendo ajustes en la dieta y el ejercicio.',
            'Los hombres tienden a tener una mayor masa muscular y una tasa metabólica basal más alta en comparación con las mujeres, lo que puede afectar las necesidades calóricas y los requerimientos nutricionales a medida que envejecen.',
            'Las mujeres tienen un mayor riesgo de deficiencia de hierro, especialmente después de la menopausia, por lo que es importante consumir fuentes ricas en hierro y vitamina C para mejorar su absorción.',
            'Los hombres mayores tienen una tendencia a enfrentar un mayor riesgo de enfermedades cardíacas, lo que destaca la importancia de una dieta baja en grasas saturadas y rica en frutas, verduras y grasas saludables.',
            'Las diferencias hormonales entre hombres y mujeres pueden influir en la respuesta al ejercicio y la forma en que el cuerpo responde al entrenamiento de fuerza y ​​resistencia con el envejecimiento. Adaptar el programa de ejercicio según el género puede optimizar los resultados.'
        ]
    },
    {
        question: '¿Tienes alguna alergia?',
        answerType: 'text',
        answerKey: 'allergy',
        placeholder: 'Escribe aquí tus alergias',
        idea: [
            'Las alergias alimentarias pueden manifestarse a cualquier edad, pero los cambios en la dieta y el estilo de vida a lo largo de los años pueden influir en la sensibilidad a ciertos alimentos.',
            'A medida que envejecemos, es posible desarrollar nuevas alergias alimentarias o experimentar cambios en la severidad de las alergias existentes, lo que subraya la importancia de estar atento a las reacciones adversas a los alimentos.',
            'La actividad física regular puede ayudar a fortalecer el sistema inmunológico y reducir la inflamación, lo que puede ser beneficioso para algunas personas con alergias alérgicas.',
            'Algunas alergias, como la alergia al polen, pueden empeorar con el tiempo debido a la exposición repetida a los alérgenos, lo que puede requerir ajustes en la dieta y el estilo de vida para manejar los síntomas.',
            'Las alergias alimentarias pueden afectar la capacidad de una persona para mantener una dieta equilibrada y variada, por lo que es importante buscar orientación de un profesional de la salud, como un dietista registrado, para garantizar una nutrición adecuada.'
        ]
    },
    {
        question: '¿Cuánto pesas (en kg)?',
        answerType: 'select',
        options: Array.from({ length: 100 }, (_, i) => i + 30).map(weight => ({ value: weight, label: weight })),
        answerKey: 'weight',
        placeholder: 'Escribe aquí tu peso',
        idea: [
            'La dieta y el ejercicio son factores clave que influyen en el peso corporal de una persona, pero también pueden estar influenciados por factores genéticos y ambientales.',
            'Una dieta equilibrada que incluya una variedad de alimentos nutritivos, junto con un nivel adecuado de actividad física, puede ayudar a mantener un peso saludable.',
            'El metabolismo basal, que representa la energía que el cuerpo necesita en reposo, puede variar entre individuos y puede influir en la facilidad para mantener, ganar o perder peso.',
            'Las dietas extremadamente restrictivas o los patrones de ejercicio excesivos pueden ser perjudiciales para la salud y pueden llevar a problemas como la malnutrición, la fatiga y los trastornos alimentarios.',
            'El peso corporal puede fluctuar a lo largo de la vida debido a cambios hormonales, cambios en el estilo de vida, eventos de vida significativos y condiciones de salud subyacentes, por lo que es importante adoptar un enfoque holístico para la gestión del peso.'
        ]
    },
    {
        question: '¿Cuánto mides (en cm)?',
        answerType: 'select',
        options: Array.from({ length: 100 }, (_, i) => i + 100).map(height => ({ value: height, label: height })),
        answerKey: 'height',
        placeholder: 'Escribe aquí tu altura',
        idea: [
            'La genética juega un papel importante en determinar la altura de una persona, pero la nutrición durante la infancia y la adolescencia también puede influir significativamente en el crecimiento.',
            'Una dieta rica en nutrientes esenciales como proteínas, calcio, vitamina D y zinc puede favorecer un crecimiento óptimo durante los años de crecimiento.',
            'El ejercicio regular, especialmente el ejercicio de peso-bearing como correr o levantar pesas, puede estimular la liberación de hormonas de crecimiento y contribuir al desarrollo de huesos fuertes y una postura saludable.',
            'La malnutrición, ya sea por deficiencia o exceso de nutrientes, puede afectar negativamente el crecimiento y la estatura final de una persona.',
            'Si bien la altura tiende a estabilizarse en la edad adulta, mantener un estilo de vida saludable que incluya una dieta equilibrada y ejercicio regular puede ayudar a mantener la salud ósea y postural a lo largo de la vida.'
        ]
    },
    {
        question: '¿Cuántas veces haces ejercicio a la semana?',
        answerType: 'select',
        answerKey: 'exerciseFrequency',
        options: [
            { value: '1', label: '1 vez a la semana' },
            { value: '2', label: '2 veces a la semana' },
            { value: '3', label: '3 veces a la semana' },
            { value: '4', label: '4 veces a la semana' },
            { value: '5', label: '5 veces a la semana' },
            { value: '6', label: '6 veces a la semana' },
            { value: '7', label: 'Todos los días' },
        ],
        idea: [
            'El ejercicio regular puede ayudar a mantener un peso saludable, mejorar la salud del corazón, aumentar la energía y mejorar el estado de ánimo.',
            'Es importante encontrar un equilibrio entre el ejercicio y el descanso. Demasiado ejercicio sin suficiente descanso puede llevar a lesiones y agotamiento.',
            'La variedad en tu rutina de ejercicios puede ayudar a mantener tu interés y motivación, y también puede ayudar a trabajar diferentes grupos de músculos.',
            'Si eres nuevo en el ejercicio, es una buena idea comenzar lentamente y aumentar gradualmente la frecuencia y la intensidad de tus entrenamientos.',
            'Recuerda que cualquier cantidad de ejercicio es mejor que nada. Incluso pequeñas cantidades de actividad física pueden tener beneficios para la salud.'
        ]
    },
    {
        question: '¿Tienes alguna enfermedad crónica?',
        answerType: 'text',
        answerKey: 'disease',
        placeholder: 'Escribe aquí tus enfermedades',
        idea: [
            'Las enfermedades crónicas, como la diabetes, la hipertensión y las enfermedades cardíacas, pueden requerir un manejo cuidadoso a través de la dieta, el ejercicio y la medicación.',
            'El manejo de las enfermedades crónicas puede requerir la colaboración de un equipo de atención médica, que puede incluir médicos, enfermeras, dietistas y otros profesionales de la salud.',
            'El seguimiento regular de la enfermedad y el cumplimiento del plan de tratamiento son fundamentales para controlar los síntomas y prevenir complicaciones a largo plazo.',
            'Las enfermedades crónicas pueden afectar la calidad de vida y la capacidad de realizar actividades diarias, por lo que es importante buscar apoyo emocional y social cuando sea necesario.',
            'Las enfermedades crónicas pueden requerir ajustes en la dieta y el estilo de vida, así como la toma de medicamentos según las indicaciones del médico para mantener la salud y prevenir complicaciones.'
        ]
    },
    {
        question: '¿Tomas alguna medicación?',
        answerType: 'text',
        answerKey: 'medication',
        placeholder: 'Escibe aquí tus medicamentos',
        idea: [
            'Es importante informar a tu médico sobre todos los medicamentos que estás tomando, incluidos los de venta libre, los suplementos y las hierbas, para evitar interacciones y efectos secundarios.',
            'Algunos medicamentos pueden afectar el apetito, el metabolismo y la absorción de nutrientes, lo que puede influir en las necesidades nutricionales y en la respuesta al ejercicio.',
            'El cumplimiento del régimen de medicación prescrito es fundamental para controlar las enfermedades crónicas y prevenir complicaciones a largo plazo.',
            'Los cambios en la medicación, la dosis o el horario de administración pueden ser necesarios en función de la respuesta del cuerpo y los cambios en la salud.',
            'Es importante tener en cuenta los posibles efectos secundarios de la medicación y comunicarse con el médico si experimentas síntomas adversos o cambios en la salud.'
        ]
    },
    {
        question: '¿Cuántas horas duermes al día?',
        answerType: 'select',
        answerKey: 'sleepHours',
        options: [
            { value: '4', label: 'Menos de 4 horas' },
            { value: '5', label: '4-5 horas' },
            { value: '6', label: '6 horas' },
            { value: '7', label: '7 horas' },
            { value: '8', label: '8 horas' },
            { value: '9', label: '9 horas' },
            { value: '10', label: 'Más de 9 horas' }
        ],
        idea: [
            'El sueño es crucial para la salud y el bienestar, y la falta de sueño puede tener efectos negativos en la salud física y mental.',
            'La cantidad de sueño necesaria puede variar según la edad, el estilo de vida y las necesidades individuales, pero la mayoría de los adultos necesitan entre 7 y 9 horas de sueño por noche.',
            'La calidad del sueño es tan importante como la cantidad, y factores como el ambiente de sueño, la rutina de sueño y la higiene del sueño pueden influir en la calidad del descanso.',
            'La falta crónica de sueño puede aumentar el riesgo de enfermedades crónicas, como la diabetes, la obesidad y las enfermedades cardíacas, y puede afectar la función cognitiva y el estado de ánimo.',
            'Establecer una rutina de sueño regular, crear un ambiente propicio para dormir y practicar hábitos de higiene del sueño saludables pueden ayudar a mejorar la calidad y la cantidad de sueño.'
        ]
    },
    {
        question: '¿Cuál es tu ocupación?',
        answerType: 'text',
        answerKey: 'occupation',
        placeholder: 'Escribe aquí tu ocupación',
        idea: [
            'La ocupación y el estilo de vida pueden influir en la salud y el bienestar de una persona, ya que determinan la cantidad de actividad física, el nivel de estrés y la exposición a factores de riesgo.',
            'Algunas ocupaciones pueden requerir largas horas de trabajo sedentario, lo que puede aumentar el riesgo de problemas de salud como la obesidad, la diabetes y las enfermedades cardíacas.',
            'El estrés laboral y la falta de equilibrio entre el trabajo y la vida personal pueden afectar la salud mental y emocional, lo que destaca la importancia de encontrar un equilibrio saludable.',
            'Las ocupaciones que implican exposición a sustancias tóxicas, ambientes peligrosos o riesgos para la salud pueden requerir medidas de protección y seguimiento médico regular.',
            'La elección de una ocupación que sea gratificante, estimulante y compatible con un estilo de vida saludable puede contribuir al bienestar general y la calidad de vida.'
        ]
    },
    {
        question: '¿Cuáles son tus objetivos de salud?',
        answerType: 'text',
        answerKey: 'goals',
        placeholder: 'Escribe aquí tus objetivos',
        idea: [
            'Los objetivos nos ayudan a generarte un perfil mucho más específico y personalizado, no es lo mismo querer aumentar de peso, que aumentar de masa muscular.'
        ]
    },
    {
        question: '¿Cuál es tu número de teléfono?',
        answerType: 'text',
        answerKey: 'phone',
        placeholder: 'Escribe aquí tu número de teléfono',
        idea: [
            'Tu número de teléfono es importante para poder contactarte en caso de emergencia o para enviarte información relevante sobre tu perfil y tus objetivos de salud.'
        ]
    }
];

export default steps;