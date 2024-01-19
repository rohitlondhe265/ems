import Sidebar from './Sidebar';
import Content from './Content';
import { Suspense } from 'react';

export default function Exam() {

    return (
        <div className="flex flex-no-wrap my-6 md:gap-6">
            <Sidebar />
            <Suspense fallback={<div>Loading questions ...</div>}>
                <Content />
            </Suspense>
        </div>
    )
}