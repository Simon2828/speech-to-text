import React, {component} from 'react';
import Link from 'next/link';


export const LoLink = (props) => (
    <li>
        <Link as={`/learning-objective/${props.id}`} href={`/lo?learningObjective=${props.learningObjective}`}>
        <a>{props.learningObjective}</a>
        </Link>

    </li>
)