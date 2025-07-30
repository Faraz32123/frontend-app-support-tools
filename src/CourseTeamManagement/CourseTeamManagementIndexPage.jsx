import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useIntl } from '@edx/frontend-platform/i18n';
import { Button, Form } from '@openedx/paragon';

import AlertList from '../userMessages/AlertList';
import CourseTeamPageUserSearch from '../users/UserPage';
import messages from './messages';


export default function CourseTeamManagementIndexPage() {
    const location = useLocation();
    const intl = useIntl();
    return (
        <div className="container-fluid">
        <AlertList topic="general" className="mb-3 mt-5" />
        <section className="course-team-management-header">
            <h2 className="font-weight-bold">{intl.formatMessage(messages.pageTitle)}</h2>
        </section>
        <CourseTeamPageUserSearch location={location} isOnCourseTeamPage={true} />
        </div>
    );
}
